FROM node:14.16.0-alpine as build-stage

WORKDIR /client

COPY yarn.lock /client
COPY package.json /client
COPY .yarnrc.yml /client
COPY .yarn /client/.yarn

RUN yarn install

COPY packages/client /client/packages/client/

ENV GENERATE_SOURCEMAP=false

RUN yarn workspace client build

# production
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /client/build /var/www/client
COPY nginx.conf /etc/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
