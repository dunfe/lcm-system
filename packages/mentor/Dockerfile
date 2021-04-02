FROM node:14.16.0-alpine as build-stage

WORKDIR /mentor

COPY packages/mentor/package.json /mentor/packages/mentor/
COPY packages/mentor/craco.config.js /mentor/packages/mentor/
COPY yarn.lock package.json .yarnrc.yml /mentor/
COPY .yarn /mentor/.yarn

RUN yarn install

COPY packages/mentor /mentor/packages/mentor/

ENV GENERATE_SOURCEMAP=false

RUN yarn workspace mentor build
