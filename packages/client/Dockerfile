FROM node:14.16.0-alpine as build-stage

WORKDIR /client

COPY package.json /client/
COPY . /client
RUN npm install
RUN npm run build

# production
FROM nginx:1.17-alpine as production-state
COPY --from=base /client/build /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]

