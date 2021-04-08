FROM node:14.16.0-alpine as build-stage

WORKDIR /notify-server

COPY yarn.lock /notify-server
COPY package.json /notify-server
COPY .yarnrc.yml /notify-server
COPY .yarn /notify-server/.yarn
COPY packages/notify-server/package.json /notify-server/packages/notify-server/

RUN yarn install

COPY packages/notify-server /notify-server/packages/notify-server/

EXPOSE 3007

CMD yarn start:notify-server
