FROM node:14.16.0-alpine as build-stage

WORKDIR /client

COPY packages/client/package.json /client/packages/client/
COPY packages/admin/package.json /client/packages/admin/
COPY packages/landing/package.json /client/packages/landing/
COPY packages/client/craco.config.js /client/packages/client/
COPY packages/admin/craco.config.js /client/packages/admin/
COPY yarn.lock package.json .yarnrc.yml /client/
COPY .yarn /client/.yarn

RUN yarn install

COPY packages/client /client/packages/client/
COPY packages/admin /client/packages/admin/
COPY packages/landing /client/packages/landing/

ENV GENERATE_SOURCEMAP=false

RUN yarn workspace client build
RUN yarn workspace admin build
RUN yarn workspace landing buil
