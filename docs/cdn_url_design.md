# 📘 CDN URL Design (2-Level Structure)

## 1. Overview

This document defines the URL design policy for static assets distributed via the LIMIT.Lab CDN.
It covers slides, workshop materials, reports, and other public-facing resources hosted on AWS S3
and delivered through CloudFront.

## 2. Goals

- Keep URLs consistent, short, and maintainable.
- Clearly separate immutable (versioned) and latest (stable) access points.
- Organize files per event for easy management and archival.
- Enable long-term CDN caching without invalidation overhead.

## 3. CDN Structure
- CDN Provider: AWS CloudFront  
- Origin: S3 bucket (`prod-limitlab-webpage-cdn-cloudfront-origin`, `dev-limitlab-webpage-cdn-cloudfront-origin`)
- Environments:
  - **Production** → `cdn.limitlab.xyz`
  - **Development** → `cdn.dev.limitlab.xyz`
- Each environment uses a dedicated CloudFront distribution and S3 bucket.

## 4. Directory Structure (2 Levels)

```
/{event}/{type}/
```

| Element | Description                                         | Example                                                  |
| ------- | --------------------------------------------------- | -------------------------------------------------------- |
| `event` | Short identifier for the event (conference + year). | `miru2025`, `cvpr2026`, `cccs2025`                       |
| `type`  | Asset type (1-letter or short code).                | `s` = slides, `p` = posters, `r` = reports, `a` = assets |


## 5. File Naming Convention

```
{slug}_{version-tag}_{hash}{lang?}{variant?}.{ext}
```

| Element       | Description                                      | Example                                |
| ------------- | ------------------------------------------------ | -------------------------------------- |
| `slug`        | Descriptive name or workshop keyword.            | `found-workshop-opening-remarks`, `limit-robustml` |
| `version-tag` | Semantic version or date tag.                    | `v2025-10-19`, `v1.2.3`                |
| `hash`        | Short content hash (first 12 chars of SHA-256).  | `8d2d2e3e1a4b`                         |
| `lang`        | Language suffix based on ISO-639 (optional).     | `-ja`, `-en`                           |
| `variant`     | Variant such as resolution or format (optional). | `-w1200`, `-thumb`                     |
| `ext`         | File extension.                                  | `.pdf`, `.pptx`, `.webp`, `.jpg`       |

## 6. Latest URLs (stable entry points)

```
{slug}_latest{lang?}{variant?}.{ext}
```

Use `latest` as alias for stable URLs. Stable URLs always resolving to the most recent version. During deployment, upload and overwrite alias.

## 7. URL Examples

- Workshop slide: `https://cdn.limitlab.xyz/iccv2025/iccv2025-found-workshop-opening-remarks_latest-en.pdf`
- Conference report slide: `https://cdn.limitlab.xyz/cvpr2026/cvpr2026-conference-report_v0.1.0_8d2d2e3e1a4b-ja.pdf`
- Event presenter photo: `https://cdn.limitlab.xyz/cccs2025/presenter-name_v2025-10-19_8d2d2e3e1a4b.jpg`