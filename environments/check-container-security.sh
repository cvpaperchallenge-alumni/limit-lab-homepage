#!/bin/sh
set -eu
: "${1:?usage: check-container-security.sh IMAGE}"
docker run --rm --pull=never --network none --read-only --cap-drop ALL --security-opt no-new-privileges --entrypoint /bin/sh "$1" -ec '
  brotli=$(apk info -v | sed -n "s/^brotli-libs-//p"); test -n "$brotli"
  case "$(apk version -t "$brotli" 1.1.1-r0)" in ">"|"=") :;; *) exit 1;; esac
  ca=$(apk info -v | sed -n "s/^ca-certificates-bundle-//p"); test -n "$ca"
  case "$(apk version -t "$ca" 20261020-r0)" in ">"|"=") :;; *) exit 1;; esac
  test "$(tflint --version | head -n 1)" = "TFLint version 0.59.1"
  terraform version
  curl --version
'
