FROM node:14.16.0-alpine as build-stage

WORKDIR /client

COPY packages/client /client/packages/client/
COPY packages/admin /client/packages/admin/
COPY packages/landing /client/packages/landing/
COPY yarn.lock package.json .yarnrc.yml /client/
COPY .yarn /client/.yarn

RUN yarn install

ENV GENERATE_SOURCEMAP=false

RUN yarn workspace client build
RUN yarn workspace admin build
RUN yarn workspace landing build

# production
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /client/packages/client/build /usr/share/nginx/client/html
COPY --from=build-stage /client/packages/admin/build /usr/share/nginx/admin/html
COPY --from=build-stage /client/packages/landing/dist /usr/share/nginx/landing/html
COPY ./data/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
