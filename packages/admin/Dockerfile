FROM node:14.16.0-alpine as build-stage

WORKDIR /admin

COPY packages/admin/package.json /admin/packages/admin/
COPY packages/admin/craco.config.js /admin/packages/admin/
COPY yarn.lock package.json .yarnrc.yml /admin/
COPY .yarn /admin/.yarn

RUN yarn install

COPY packages/admin /admin/packages/admin/

ENV GENERATE_SOURCEMAP=false

RUN yarn workspace admin build
