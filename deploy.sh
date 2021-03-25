#!/bin/bash

cd lcm-system

git pull

docker-compose up -d --build
