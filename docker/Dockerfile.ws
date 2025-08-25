FROM oven/bun:1 AS base

# set workdir at repo root
WORKDIR /apps

COPY packages ./packages
COPY bun.lock ./bun.lock

COPY package.json ./package.json
COPY turbo.json ./turbo.json

COPY apps/websocket /apps/websocket

RUN bun install

RUN bun db:generate

WORKDIR /apps/websocket
EXPOSE 8081

CMD [ "bun" ,"run" , "index.ts" ]

