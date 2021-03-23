#!/bin/bash

cd lcm-system

git pull orgin master

docker-compose down
docker-compose build
docker-compose up
