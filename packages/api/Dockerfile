FROM node:14.16.0

RUN mkdir /src

WORKDIR /src
ADD package.json /src/package.json
RUN npm install

COPY . /src

EXPOSE 3000

CMD ["node", "app.js"]
