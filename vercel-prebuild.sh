git config --global url."https://${GH_TOKEN}@github.com/".insteadOf "https://github.com/"

git config --global --list

git submodule sync

git submodule update --init --recursive