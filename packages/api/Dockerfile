FROM node:14.16.0-alpine as build-stage

WORKDIR /api

COPY yarn.lock /api
COPY package.json /api
COPY .yarnrc.yml /api
COPY .yarn /api/.yarn
COPY packages/api/package.json /api/packages/api/

RUN yarn install

COPY packages/api /api/packages/api/

EXPOSE 3000

CMD yarn start:api
