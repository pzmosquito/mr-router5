FROM node:14-alpine

RUN apk add --no-cache ca-certificates
RUN npm install -g npm@6

WORKDIR /usr/app
