FROM node:14.16.0-alpine

WORKDIR /api

COPY package.json /api
COPY . /api
RUN npm install

EXPOSE 3000

CMD node app.js
