FROM node:lts-alpine

RUN mkdir app
WORKDIR /app

COPY public public
COPY package.json ./

COPY tsconfig.json ./
COPY setup.js ./
COPY tailwind.config.js ./

RUN npm install


COPY src src


CMD npm start
