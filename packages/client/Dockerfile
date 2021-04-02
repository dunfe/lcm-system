FROM node:14.16.0-alpine as build-stage

WORKDIR /client

COPY packages/client/package.json /client/packages/client/
COPY packages/client/craco.config.js /client/packages/client/
COPY yarn.lock package.json .yarnrc.yml /client/
COPY .yarn /client/.yarn

RUN yarn install

COPY packages/client /client/packages/client/

ENV GENERATE_SOURCEMAP=false

RUN yarn workspace client build
