FROM node:14.16.0-alpine

WORKDIR /api

COPY package.json /api

RUN npm install
COPY . /api

RUN chown -R node:node /api

USER node

CMD ["node", "app.js"]