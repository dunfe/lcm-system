FROM node:14.16.0-alpine as build-stage

WORKDIR /t-server

COPY yarn.lock /t-server
COPY package.json /t-server
COPY .yarnrc.yml /t-server
COPY .yarn /t-server/.yarn
COPY packages/t-server/package.json /t-server/packages/t-server/

RUN yarn install

COPY packages/t-server /t-server/packages/t-server/

EXPOSE 3006

CMD yarn start:t-server
