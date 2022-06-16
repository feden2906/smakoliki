FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .
