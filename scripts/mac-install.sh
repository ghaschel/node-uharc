#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

echo "Checking if wine is installed..."
command -v wine >/dev/null 2>&1 || { 
    echo "Wine not installed.";
    echo "Checking if HomeBrew is installed...";

    command -v brew >/dev/null 2>&1 || {
        echo "Brew not installed. Installing.";
        /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
    }

    echo "Checking if xquartz is isntalled...";
    command -v xquartz >/dev/null 2>&1 || {
        echo "xquartz not installed. Installing.";
        brew cask install xquartz;
    }

    echo "Installing wine. It will ask for sudo";
    sudo mkdir /usr/local/Cellar;
    sudo chown -R $(whoami) $(brew --prefix)/*;
    brew install wine;

    # get path or update bash env variables
    /usr/local/Cellar/wine/3.0/bin/wine
}