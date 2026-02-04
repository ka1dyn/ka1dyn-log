#!/bin/bash

# Initializing
git submodule deinit -f . || true
rm -rf .git/modules/contents

sed -i "s|https://github.com/|https://${GH_TOKEN}@github.com/|g" .gitmodules

git submodule sync --recursive

git submodule update --init --recursive