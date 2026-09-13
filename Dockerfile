# Base
FROM node:lts-alpine as base

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .

# Build
FROM base as build

ARG RAILWAY_GIT_COMMIT_SHA
ENV RAILWAY_GIT_COMMIT_SHA=$RAILWAY_GIT_COMMIT_SHA

RUN pnpm run lint && \
    pnpm run build:prod

# Prod
FROM nginx:stable as prod

COPY --from=build /usr/src/app/dist/the-binary-game /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
