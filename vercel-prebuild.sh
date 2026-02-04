git config --local url."https://${GH_TOKEN}@github.com".insteadOf "https://github.com"

git config --local --list

git submodule sync

git submodule update --init --recursive