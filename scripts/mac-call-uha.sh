#!/usr/bin/env bash

set -o errexit
set -o pipefail

/usr/local/Cellar/wine/3.0/bin/wine uharc.exe a -d2 -m3 -md32768 -mm+ -y+ u.uha *.exe