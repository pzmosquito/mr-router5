FROM node:20-alpine

RUN apk add --no-cache ca-certificates
RUN npm install -g npm@10

WORKDIR /usr/app
