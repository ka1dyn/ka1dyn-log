git config --local url."https://${GH_TOKEN}@github.com/".insteadOf "https://github.com/"

git submodule sync

git submodule update --init --recursive