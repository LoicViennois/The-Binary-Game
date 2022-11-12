# Base
FROM node:lts-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# Build
FROM base as build

RUN npm run lint && \
    npm run build:prod

# Prod
FROM nginx:stable as prod

COPY --from=build /usr/src/app/dist/the-binary-game /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
