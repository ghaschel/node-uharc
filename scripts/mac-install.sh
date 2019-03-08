#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

function installBrew {
    echo "Brew not installed. Installing."
    $(which ruby) -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
}

function installWine {
    if [[ ! -d /usr/local/Cellar ]]
    then
        sudo mkdir /usr/local/Cellar;
    fi
    sudo chown -R $(whoami) $(brew --prefix)/*;
    /usr/local/bin/brew install wine;

    # at first run wine will generate its necessary config files
    echo "Generating wine config files"
    $(/usr/local/bin/brew --prefix wine)/bin/wine &>/dev/null
}

echo "Checking if brew is installed..."
if [[ -f /usr/local/bin/brew ]]
then
    echo "Brew installed"
    echo "Checking if wine is installed"
    if brew ls --versions wine > /dev/null;
    then
        echo "Wine already installed"
    else
        echo "Wine not installed. Installing. It will ask for sudo"
        installWine
    fi
else
    echo "Not installed. Installing Homebrew - It will ask for sudo"
    installBrew
    echo "Installing wine. - It will ask for sudo"
    installWine
fi