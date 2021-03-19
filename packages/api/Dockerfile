FROM node:14.16.0

RUN mkdir /src

WORKDIR /src
ADD package.json /src/package.json
RUN npm install

ADD nodemon.json /src/nodemon.json

EXPOSE 3000

CMD ["node", "app.js"]
