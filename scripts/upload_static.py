#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Minimal uploader for LIMIT.Lab CDN URL design with environment auto-detection.

This module provides a minimal, opinionated CLI for uploading static assets to
an AWS S3 bucket (fronted by CloudFront) following the LIMIT.Lab CDN URL
design. It enforces a 2-level directory structure and a strict file naming
convention, always publishes a versioned object, and creates a short-lived
"latest" alias for stable access.

Environment auto-detection:
  - The current AWS account is resolved via STS GetCallerIdentity.
  - The account is mapped to an environment (prod/dev) and its canonical
    CloudFront origin bucket and public CDN domain.

    Mapping:
      prod:
        - account_id: 664418960222
        - bucket:     prod-limitlab-webpage-cdn-cloudfront-origin
        - domain:     cdn.limitlab.xyz
      dev:
        - account_id: 022731370203
        - bucket:     dev-limitlab-webpage-cdn-cloudfront-origin
        - domain:     cdn.dev.limitlab.xyz

  - If the account is not recognized, the program fails fast with a clear error.

URL design implemented:

  Directory (2-level):
    /{event}/{type}/

  Versioned filename:
    {slug}_{version-tag}_{hash}{lang?}{variant?}.{ext}

  Latest alias:
    {slug}_latest{lang?}{variant?}.{ext}

Fields:
  - event: Short identifier for the event (e.g., "iccv2025", "cvpr2026").
  - type:  Asset type code (e.g., "s"=slides, "p"=posters, "r"=reports, "a"=assets).
  - slug:  Descriptive identifier for the asset.
  - version-tag: Required tag (e.g., "v2025-10-19" or "v1.2.3"); must start with "v".
  - hash:  First 12 hex characters of the content SHA-256.
  - lang (optional): ISO-639 language code suffix (normalized to "-{code}", e.g., "-ja").
  - variant (optional): Variant suffix like resolution/format (normalized to "-{token}", e.g., "-w1200").
  - ext:   File extension inferred from the source filename.

Caching policy (fixed best-practice defaults):
  - Versioned object: "public, max-age=31536000, immutable"
  - Latest alias:     "public, max-age=300"

Security and integrity:
  - Server-side encryption: SSE-S3 (AES256)
  - Integrity: S3 ChecksumSHA256 (base64-encoded SHA-256)

AWS region and credentials:
  - No --region option. boto3 uses the default provider chain (env vars, AWS
    config/credentials files, SSO/IMDS/ECS, etc.).
  - Dry-run mode performs **no S3 writes**, but *does* call STS to detect the
    environment (read-only).

Examples:
  Upload to the environment determined by current AWS credentials:
    $ python upload_static.py \\
        --file ./slides/iccv2025-opening-ja.pdf \\
        --event iccv2025 \\
        --type s \\
        --slug iccv2025-found-workshop-opening-remarks \\
        --version-tag v2025-10-19 \\
        --lang ja

  Dry-run (no upload; show keys/URLs/headers; still queries STS):
    $ python upload_static.py \\
        --file ./slides/iccv2025-opening-ja.pdf \\
        --event iccv2025 \\
        --type s \\
        --slug iccv2025-found-workshop-opening-remarks \\
        --version-tag v2025-10-19 \\
        --lang ja \\
        --dry-run

Notes:
  - The S3 bucket is assumed to be configured as a CloudFront origin behind an
    OAC (Origin Access Control). This script never sets object ACLs.
  - Overwriting the "latest" key is expected and safe with the short cache TTL.
  - The tool is designed for CI/CD pipelines where repeatable, low-variance
    behavior is preferred over configurability.
"""

import argparse
import base64
import hashlib
import json
import mimetypes
from pathlib import Path
from typing import Final

import boto3
from botocore.exceptions import ClientError


# -------- Environment mapping (account -> bucket/domain) --------

ENV_CONFIG: Final = {
    "prod": {
        "account_id": "664418960222",
        "bucket": "prod-limitlab-webpage-cdn-cloudfront-origin",
        "domain": "cdn.limitlab.xyz",
    },
    "dev": {
        "account_id": "022731370203",
        "bucket": "dev-limitlab-webpage-cdn-cloudfront-origin",
        "domain": "cdn.dev.limitlab.xyz",
    },
}


def resolve_env_targets() -> dict:
    """Resolve environment targets (env, bucket, domain) from the current AWS account.

    This function calls STS ``GetCallerIdentity`` to obtain the AWS account ID
    of the active credentials and maps it to a known environment (prod/dev).
    The mapping determines the S3 bucket (CloudFront origin) and the public
    CloudFront domain.

    Returns:
      A dictionary with keys:
        - env (str): 'prod' or 'dev'.
        - account_id (str): The AWS account ID reported by STS.
        - bucket (str): Canonical S3 bucket name for the environment.
        - domain (str): Public CloudFront domain for the environment.

    Raises:
      botocore.exceptions.ClientError: If STS returns an API error.
      RuntimeError: If the account ID is not recognized by the mapping.

    Examples:
      >>> isinstance(resolve_env_targets(), dict)  # doctest: +SKIP
      True
    """
    sts = boto3.client("sts")
    account_id = sts.get_caller_identity()["Account"]

    for env, cfg in ENV_CONFIG.items():
        if cfg["account_id"] == account_id:
            return {
                "env": env,
                "account_id": account_id,
                "bucket": cfg["bucket"],
                "domain": cfg["domain"],
            }
    raise RuntimeError(
        f"Unsupported AWS account: {account_id}. "
        "This tool only supports prod/dev accounts defined in ENV_CONFIG."
    )


# -------- Helpers --------

def sha256_short(data: bytes, length: int = 12) -> str:
    """Compute a short hex digest of the content.

    Args:
      data: Raw file bytes to hash.
      length: Number of leading hex characters to keep. Defaults to 12.

    Returns:
      A lowercase hex string of length ``length`` containing the leading
      characters of the SHA-256 hex digest.

    Examples:
      >>> sha256_short(b"hello", 6)
      '2cf24d'
    """
    return hashlib.sha256(data).hexdigest()[:length]


def sha256_b64(data: bytes) -> str:
    """Compute base64-encoded SHA-256 for S3 checksum.

    This value can be passed to S3's ``ChecksumSHA256`` parameter to enable
    end-to-end integrity checks.

    Args:
      data: Raw file bytes to hash.

    Returns:
      Base64-encoded SHA-256 digest.

    Examples:
      >>> isinstance(sha256_b64(b"hello"), str)
      True
    """
    return base64.b64encode(hashlib.sha256(data).digest()).decode("ascii")


def norm_suffix(s: str | None) -> str:
    """Normalize an optional suffix into the '-token' form.

    Args:
      s: Optional suffix token (e.g., 'ja', '-ja', 'w1200', '-w1200', or None).

    Returns:
      A normalized suffix beginning with '-' or an empty string if ``s`` is falsy.

    Examples:
      >>> norm_suffix(None)
      ''
      >>> norm_suffix('ja')
      '-ja'
      >>> norm_suffix('-w1200')
      '-w1200'
    """
    if not s:
        return ""
    return s if s.startswith("-") else f"-{s}"


def content_type_for(filename: str) -> str:
    """Guess a Content-Type from the filename.

    Args:
      filename: Name of the source file (used to infer the extension).

    Returns:
      A MIME type string suitable for S3's ``ContentType`` header. Falls back to
      ``application/octet-stream`` when no type can be inferred.

    Examples:
      >>> content_type_for("x.pdf")
      'application/pdf'
    """
    ctype, _ = mimetypes.guess_type(filename)
    return ctype or "application/octet-stream"


def content_disposition_for(ctype: str, filename: str) -> str | None:
    """Return a Content-Disposition value for inline PDF viewing.

    For better UX, PDFs are served inline so that browsers render them natively.
    Other types are left to browser defaults.

    Args:
      ctype: Resolved MIME type of the object.
      filename: Display name used in the header.

    Returns:
      A valid Content-Disposition header string if the content is a PDF,
      otherwise ``None``.

    Examples:
      >>> content_disposition_for("application/pdf", "doc.pdf").startswith("inline;")
      True
      >>> content_disposition_for("image/png", "img.png") is None
      True
    """
    if ctype == "application/pdf":
        return f'inline; filename="{Path(filename).name}"'
    return None


def build_filename(
    slug: str,
    version_tag: str,
    content_hash: str,
    lang_suffix: str,
    variant_suffix: str,
    ext: str,
    latest: bool = False,
) -> str:
    """Build a file name that conforms to the CDN design.

    Args:
      slug: Descriptive slug for the asset.
      version_tag: Version tag (must start with 'v', e.g., 'v2025-10-19').
      content_hash: Short hash (first 12 hex chars of SHA-256).
      lang_suffix: Optional language suffix already normalized (e.g., '-ja' or '').
      variant_suffix: Optional variant suffix already normalized (e.g., '-w1200' or '').
      ext: File extension including leading dot (e.g., '.pdf').
      latest: If True, return the 'latest' alias filename; otherwise versioned.

    Returns:
      A filename string compliant with the design.

    Examples:
      >>> build_filename("talk", "v1.0.0", "abcdef123456", "-ja", "", ".pdf")
      'talk_v1.0.0_abcdef123456-ja.pdf'
      >>> build_filename("talk", "v1.0.0", "abcdef123456", "", "", ".pdf", latest=True)
      'talk_latest.pdf'
    """
    base = f"{slug}_latest" if latest else f"{slug}_{version_tag}_{content_hash}"
    return f"{base}{lang_suffix}{variant_suffix}{ext}"


def build_key(event: str, type_code: str, filename: str) -> str:
    """Construct the S3 object key (no leading slash).

    Args:
      event: Event identifier (e.g., 'iccv2025').
      type_code: Asset type code (e.g., 's', 'p', 'r', 'a').
      filename: The final filename component.

    Returns:
      The concatenated S3 key in the form '{event}/{type_code}/{filename}'.

    Examples:
      >>> build_key("iccv2025", "s", "file.pdf")
      'iccv2025/s/file.pdf'
    """
    return f"{event.strip('/ ')}/{type_code.strip('/ ')}/{filename}"


def validate_inputs(*, file_path: Path, version_tag: str) -> None:
    """Validate minimal preconditions before uploading.

    Args:
      file_path: Path to the source file; must exist and have an extension.
      version_tag: Version tag provided by the user; must start with 'v'.

    Raises:
      FileNotFoundError: If the source file does not exist.
      ValueError: If the file has no extension or version_tag is invalid.

    Examples:
      >>> import tempfile
      >>> p = Path(tempfile.gettempdir()) / "x.pdf"
      >>> _ = p.write_bytes(b"data")
      >>> validate_inputs(file_path=p, version_tag="v1.0.0")
    """
    if not file_path.exists():
        raise FileNotFoundError(str(file_path))
    if not file_path.suffix:
        raise ValueError("Source file must have an extension (e.g., .pdf, .jpg).")
    if not version_tag or not version_tag.startswith("v"):
        raise ValueError('--version-tag must start with "v" (e.g., v2025-10-19 or v1.2.3).')


# -------- Core --------

def upload(
    *,
    bucket: str,
    domain: str,
    file_path: Path,
    event: str,
    type_code: str,
    slug: str,
    version_tag: str,
    lang: str | None,
    variant: str | None,
    dry_run: bool,
    env: str,
    account_id: str,
) -> dict:
    """Upload a versioned object and create the 'latest' alias (or preview).

    Workflow:
      1) Validate inputs (file existence, extension, version tag format).
      2) Compute short content hash (first 12 hex chars of SHA-256).
      3) Build versioned and 'latest' filenames & keys.
      4) Prepare deterministic headers:
         - Versioned: Cache-Control 'public, max-age=31536000, immutable'
         - Latest:    Cache-Control 'public, max-age=300'
         - Content-Type via ``mimetypes.guess_type``
         - Content-Disposition 'inline' for PDFs only
         - SSE-S3 (AES256), ChecksumSHA256 (base64 of SHA-256)
      5) If ``dry_run`` is True, return a preview dictionary (no S3 writes).
         STS may be called earlier during env detection.

    Args:
      bucket: Target S3 bucket name (resolved from the current account).
      domain: Public CloudFront domain (resolved from the current account).
      file_path: Path to the file that will be uploaded.
      event: Event identifier, used as the first directory level.
      type_code: Asset type code, used as the second directory level.
      slug: Descriptive slug for the object name.
      version_tag: Version tag, must start with 'v' (e.g., 'v2025-10-19').
      lang: Optional language code (e.g., 'ja' or '-ja').
      variant: Optional variant token (e.g., 'w1200' or '-w1200').
      dry_run: If True, do not write to S3; return a full preview instead.
      env: Resolved environment label ('prod' or 'dev').
      account_id: Resolved AWS account ID.

    Returns:
      A JSON-serializable dictionary. In dry-run mode, fields include
      ``*_preview`` keys and planned headers. In upload mode, fields include the
      final S3 keys and CloudFront URLs.

    Raises:
      FileNotFoundError: If the source file does not exist.
      ValueError: If the source file has no extension or version_tag is invalid.
      botocore.exceptions.ClientError: For S3 API errors during upload/copy.
    """
    validate_inputs(file_path=file_path, version_tag=version_tag)

    data = file_path.read_bytes()
    content_hash = sha256_short(data)

    # Build names
    ext = file_path.suffix  # validated non-empty
    lang_sfx = norm_suffix(lang)
    variant_sfx = norm_suffix(variant)

    v_filename = build_filename(slug, version_tag, content_hash, lang_sfx, variant_sfx, ext, latest=False)
    l_filename = build_filename(slug, version_tag, content_hash, lang_sfx, variant_sfx, ext, latest=True)

    v_key = build_key(event, type_code, v_filename)
    l_key = build_key(event, type_code, l_filename)

    # Headers
    ctype = content_type_for(file_path.name)
    cdisp = content_disposition_for(ctype, file_path.name)

    v_cache = "public, max-age=31536000, immutable"
    l_cache = "public, max-age=300"
    checksum_b64 = sha256_b64(data)

    if dry_run:
        # No S3 writes; show a full preview along with env/account context
        return {
            "dry_run": True,
            "env": env,
            "aws_account_id": account_id,
            "bucket": bucket,
            "domain": domain,
            "source_file": str(file_path),
            "event": event,
            "type": type_code,
            "slug": slug,
            "version_tag": version_tag,
            "content_hash": content_hash,
            "key_versioned_preview": v_key,
            "s3_uri_versioned_preview": f"s3://{bucket}/{v_key}",
            "cloudfront_url_versioned_preview": f"https://{domain}/{v_key}",
            "key_latest_preview": l_key,
            "s3_uri_latest_preview": f"s3://{bucket}/{l_key}",
            "cloudfront_url_latest_preview": f"https://{domain}/{l_key}",
            "headers": {
                "content_type": ctype,
                "content_disposition": cdisp,
                "versioned_cache_control": v_cache,
                "latest_cache_control": l_cache,
                "server_side_encryption": "AES256",
                "checksum_sha256_b64": checksum_b64,
            },
        }

    # Actual upload path (region/credentials resolved by the default provider chain)
    s3 = boto3.client("s3")

    # Versioned object: long-lived cache with immutable
    s3.put_object(
        Bucket=bucket,
        Key=v_key,
        Body=data,
        ContentType=ctype,
        CacheControl=v_cache,
        ServerSideEncryption="AES256",
        ChecksumSHA256=checksum_b64,
        Metadata={
            "original-filename": file_path.name,
            "version-tag": version_tag,
            "content-hash": content_hash,
        },
        **({"ContentDisposition": cdisp} if cdisp else {}),
    )

    # Latest alias: short-lived cache (no immutable)
    s3.copy_object(
        Bucket=bucket,
        Key=l_key,
        CopySource={"Bucket": bucket, "Key": v_key},
        MetadataDirective="REPLACE",
        ContentType=ctype,
        CacheControl=l_cache,
        ServerSideEncryption="AES256",
        Metadata={
            "alias": "latest",
            "points-to": v_key,
            "original-filename": file_path.name,
            "version-tag": version_tag,
            "content-hash": content_hash,
        },
        **({"ContentDisposition": cdisp} if cdisp else {}),
    )

    return {
        "env": env,
        "aws_account_id": account_id,
        "bucket": bucket,
        "domain": domain,
        "key_versioned": v_key,
        "s3_uri_versioned": f"s3://{bucket}/{v_key}",
        "cloudfront_url_versioned": f"https://{domain}/{v_key}",
        "key_latest": l_key,
        "s3_uri_latest": f"s3://{bucket}/{l_key}",
        "cloudfront_url_latest": f"https://{domain}/{l_key}",
    }


# -------- CLI --------

def parse_args() -> argparse.Namespace:
    """Parse command-line arguments for the uploader CLI.

    Returns:
      An ``argparse.Namespace`` with the following attributes:

      - file (str): Path to the source file to upload.
      - event (str): Event identifier (first directory level).
      - type_code (str): Asset type code (second directory level).
      - slug (str): Descriptive slug for the file name.
      - version_tag (str): Required version tag (must start with 'v').
      - lang (str | None): Optional language suffix.
      - variant (str | None): Optional variant suffix.
      - dry_run (bool): Whether to print a preview instead of uploading.

    Notes:
      - Bucket and domain are resolved automatically from the active AWS
        account via STS; no corresponding flags are provided.
      - The function performs no validation beyond argument presence. Semantics
        (e.g., file existence and version tag shape) are validated in ``upload()``.
    """
    p = argparse.ArgumentParser(description="Minimal LIMIT.Lab CDN uploader (auto env detection)")
    p.add_argument("--file", required=True, help="Path to source file")
    p.add_argument("--event", required=True, help="Event id (e.g., iccv2025)")
    p.add_argument("--type", required=True, dest="type_code", help="Asset type code (s|p|r|a)")
    p.add_argument("--slug", required=True, help="Slug (descriptive name)")
    p.add_argument("--version-tag", required=True, help='Version tag (e.g., "v2025-10-19" or "v1.2.3")')
    p.add_argument("--lang", default=None, help='Optional language suffix (e.g., "ja" or "-ja")')
    p.add_argument("--variant", default=None, help='Optional variant suffix (e.g., "w1200" or "-w1200")')
    p.add_argument("--dry-run", action="store_true", help="Print a preview without uploading (still calls STS)")
    return p.parse_args()


def main() -> int:
    """CLI entry point.

    Steps:
      1) Resolve environment/bucket/domain via STS (read-only).
      2) Parse CLI args and call ``upload()``.
      3) Print a JSON result to stdout.

    Exit codes:
      0: Success (either uploaded or dry-run preview printed).
      1: Generic error (e.g., file not found, invalid arguments).
      3: AWS client error (STS/S3 API responded with an error).

    Returns:
      Process exit code: 0 on success, non-zero on failure.
    """
    try:
        env_info = resolve_env_targets()
        args = parse_args()
        result = upload(
            bucket=env_info["bucket"],
            domain=env_info["domain"],
            file_path=Path(args.file),
            event=args.event,
            type_code=args.type_code,
            slug=args.slug,
            version_tag=args.version_tag,
            lang=args.lang,
            variant=args.variant,
            dry_run=args.dry_run,
            env=env_info["env"],
            account_id=env_info["account_id"],
        )
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0
    except ClientError as e:
        msg = e.response.get("Error", {})
        print(json.dumps({"error": {"code": msg.get("Code"), "message": msg.get("Message")}}, ensure_ascii=False))
        return 3
    except Exception as e:
        print(json.dumps({"error": str(e)}, ensure_ascii=False))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
