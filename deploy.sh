#!/bin/bash

cd lcm-system || exit

git reset --hard
git pull

docker-compose up -d --build
