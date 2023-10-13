FROM node:18-alpine AS base
RUN npm install -g pnpm

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN pnpm install

CMD ["pnpm", "run", "dev"]
