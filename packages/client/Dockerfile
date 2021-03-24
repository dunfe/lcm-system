FROM node:14.16.0-alpine as build-stage

WORKDIR /client

COPY packages/client /client/packages/client/
COPY yarn.lock /client
COPY package.json /client
COPY .yarnrc.yml /client
COPY .yarn /client/.yarn

RUN yarn install
RUN yarn workspace client build

# production
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /client/packages/client/build /usr/share/nginx/html
COPY client.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
