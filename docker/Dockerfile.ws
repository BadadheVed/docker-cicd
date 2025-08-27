FROM oven/bun:1 AS base

# set workdir at repo root dafult as home file 
WORKDIR /home

COPY packages ./packages
COPY bun.lock ./bun.lock

COPY package.json ./package.json
COPY turbo.json ./turbo.json

COPY apps/websocket ./apps/websocket

RUN bun install

RUN bun db:generate

WORKDIR /home/apps/websocket
EXPOSE 8081

CMD ["sh", "-c", "cd ../.. && bun db:migrate && cd apps/websocket && bun run index.ts"]

