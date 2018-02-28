echo 'Attempting to install brew, xquartz and wine';

command -v brew >/dev/null 2>&1 || {
    echo >&2 "Brew not installed. Installing.";
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
}
command -v xquartz >/dev/null 2>&1 || {
    echo >&2 "Xquartz not installed. Installing.";
    brew cask install xquartz;
}
command -v wine >/dev/null 2>&1 || { 
    echo >&2 "Wine not installed. Installing. Disclaimer: It may ask your sudo password a few times";
    sudo mkdir /usr/local/Cellar;
    sudo chown -R $(whoami) $(brew --prefix)/*;
    brew install wine;
}