FROM node:14.16.0-alpine as build-stage

WORKDIR /api

COPY packages/api /api/packages/api/
COPY yarn.lock /api
COPY package.json /api
COPY .yarnrc.yml /api
COPY .yarn /api/.yarn

RUN yarn install

CMD yarn start:api
