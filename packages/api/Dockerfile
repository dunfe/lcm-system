FROM node:14.15.4

RUN mkdir /src

RUN npm install -g nodemon

WORKDIR /src
ADD package.json /src/package.json
RUN npm install

RUN npm uninstall bcrypt
RUN npm install bcrypt

ADD nodemon.json /src/nodemon.json

EXPOSE 3000

CMD ["node", "app.js"]
