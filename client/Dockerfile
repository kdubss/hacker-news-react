# Get base node image
FROM node:12.13.1-alpine AS alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY .  .

CMD ["npm", "start"]
