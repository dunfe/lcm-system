FROM node:12.18-alpine

WORKDIR /api

COPY package.json /api

RUN npm install --production --silent
COPY . /api

RUN chown -R node:node /api

USER node

CMD ["node", "app.js"]