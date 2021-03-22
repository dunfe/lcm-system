FROM node:14.16.0-alpine as base

WORKDIR /app
COPY packages /app/packages
COPY yarn.lock /app
COPY package.json /app
COPY .yarnrc.yml /app
COPY .yarn /app/.yarn

RUN yarn install

RUN yarn workspace client build

CMD ["yarn", "start:api"]
# yarn chỉ chạy được ở trên này

# production
FROM nginx:1.17-alpine as production-state
COPY --from=base /app/packages/client/build /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
# nginx chỉ chạy được ở dưới này
