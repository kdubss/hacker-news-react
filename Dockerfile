FROM node:alpine as builder

# Specify work space in docker container
WORKDIR /app

# Copy over dependency files
COPY package.json ./
COPY package-lock.json ./

# Run necessary processes:
# Only install dependencies directly from package-lock.json
RUN npm ci

COPY ./ ./

RUN npm run build
