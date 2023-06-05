#!/bin/bash
CWD=$(pwd)

cd $CWD/tools/vite-plugin-medusa
yarn install
yarn build

cd $CWD/tools/wetkit
yarn install
yarn build

cd $CWD
yarn install --force
