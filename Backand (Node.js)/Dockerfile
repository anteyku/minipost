FROM node:16-alpine

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm i

EXPOSE 1234

EXPOSE 4321

ENTRYPOINT [ "npm", "run", "start" ]