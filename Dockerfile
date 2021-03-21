FROM node:14.16.0

RUN mkdir /app

WORKDIR /app
COPY Dockerfile /app
COPY deployment/Dockerrun.aws.json /app
COPY packages/api /app/packages/api
COPY package.json /app
COPY yarn.lock /app

RUN yarn install --pure-lockfile --non-interactive

EXPOSE 3000

CMD yarn start:api
