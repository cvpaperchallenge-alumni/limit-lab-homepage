#!/bin/sh
# Run against a locally built image; no credentials or host mounts.
set -eu
: "${1:?usage: check-frontend-security.sh IMAGE}"
docker run --rm --pull=never --network none --read-only --cap-drop ALL --security-opt no-new-privileges --pids-limit 64 --memory 512m --entrypoint node "$1" -e 'const a=require("node:assert/strict"),z=require("node:zlib");const [major,minor,patch]=process.versions.node.split(".").map(Number);a(major===24 && (minor>22 || minor===22 && patch>=1),process.version);const b=Buffer.from("Brotli regression");a.deepEqual(z.brotliDecompressSync(z.brotliCompressSync(b)),b);a.equal(z.constants.BROTLI_DECODER_ERROR_FORMAT_BLOCK_SWITCH,-17);console.log(process.version,"Brotli PASS")'
docker run --rm --pull=never --network none --read-only --cap-drop ALL --security-opt no-new-privileges --entrypoint sh "$1" -ec 'test -s /etc/ssl/certs/ca-certificates.crt; dpkg --compare-versions "$(dpkg-query -W -f="\${Version}" libbrotli1)" ge 1.0.9-2+deb12u1'
