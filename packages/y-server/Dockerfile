FROM node:14.16.0-alpine as build-stage

WORKDIR /y-server

COPY yarn.lock /y-server
COPY package.json /y-server
COPY .yarnrc.yml /y-server
COPY .yarn /y-server/.yarn
COPY packages/y-server/package.json /y-server/packages/y-server/

RUN yarn install

COPY packages/y-server /y-server/packages/y-server/

EXPOSE 3005

CMD yarn start:y-server
