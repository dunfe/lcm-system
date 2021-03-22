FROM node:14.16.0-alpine

WORKDIR /api

COPY package.json /api
RUN npm install --production --silent
COPY . /api

CMD node app.js
