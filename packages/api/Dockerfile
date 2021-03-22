FROM node:14.16.0-alpine

WORKDIR /api

COPY packages /api/packages
COPY yarn.lock /api
COPY package.json /api
COPY .yarnrc.yml /api
COPY .yarn /api/.yarn

RUN yarn install

EXPOSE 3000

CMD yarn start:api
