# Use the official Node.js 16 image as a base
FROM node:16

WORKDIR /app

COPY *.json ./

RUN npm install
RUN npm install -g ts-node
RUN npm install ts-node --save-dev

COPY src ./src
EXPOSE 8080
CMD [ "npm", "start" ]
