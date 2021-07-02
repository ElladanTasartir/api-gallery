FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "start:dev"]