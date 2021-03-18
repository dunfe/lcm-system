FROM node:14.15.4

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src
ADD package.json /src/package.json
RUN npm install

ADD nodemon.json /src/nodemon.json

EXPOSE 3000

CMD npm start