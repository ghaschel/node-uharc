#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

echo "Checking if wine is installed..."

command -v wine >/dev/null 2>&1 || { 
    echo "Not installed. Installing - it will ask for sudo";
    sudo apt-get --yes install wine;
    echo "Wine installed";
    source ~/.bashrc
    wine
}