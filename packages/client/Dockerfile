FROM node:14.16.0-alpine as build-stage

WORKDIR /client

COPY packages/client /client/packages/client/
COPY yarn.lock package.json .yarnrc.yml /client/
COPY .yarn /client/.yarn

RUN yarn install

ENV GENERATE_SOURCEMAP=false

CMD yarn workspace client start
