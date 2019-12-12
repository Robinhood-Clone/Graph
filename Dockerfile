FROM node:8.16-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN chmod +x wait-for-it.sh

RUN npm install

EXPOSE 3000