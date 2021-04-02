FROM node:14.16.0-alpine as build-stage

WORKDIR /landing

COPY packages/landing/package.json /landing/packages/landing/
COPY yarn.lock package.json .yarnrc.yml /landing/
COPY .yarn /landing/.yarn

RUN yarn install

COPY packages/landing /landing/packages/landing/

ENV GENERATE_SOURCEMAP=false

RUN yarn workspace landing build
