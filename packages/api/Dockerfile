FROM node:12.18-alpine

WORKDIR /api

RUN npm install -g pm2

COPY package.json /api

RUN npm install --production --silent
COPY . /api

RUN chown -R node:node /api

USER node

CMD ["pm2", "start", "app.js"]