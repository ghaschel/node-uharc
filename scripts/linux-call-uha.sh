#!/usr/bin/env bash

set -o errexit
set -o pipefail

wine "./bin/uharc.exe" "a" "-d2" "-m3" "-mm+" "-md32768" "-o+" "-ph+" "-b32768" "u.uha" "./bin/*.exe" >/dev/null