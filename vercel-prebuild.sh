git config --global url."https://${GH_TOKEN}@github.com/".insteadOf "https://github.com/"

git submodule sync

GIT_TRACE=1 git submodule update --init --recursive