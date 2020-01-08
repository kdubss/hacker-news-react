FROM node:alpine as builder

# Specify work space in docker container
WORKDIR /app

# Copy over dependency files
COPY package.json ./
COPY package-lock.json ./

# Run necessary processes:
# Only install dependencies directly from package-lock.json
# package.json only used as validation that there are no mismatched
# versions of any dependencies - error thrown if there are any.
RUN npm ci

# Copy codebase into the WORKDIR and create a build optimized
# for production.
COPY ./ ./

RUN npm run build

# Get another base image
# GoaL is to,
# 1. COPY the build from above
# 2. Expose the port for being accessed from outside the container
FROM node:alpine

RUN yarn global add serve

# Set workspace
WORKDIR /app

# Copy entire build from previous base image - aliased as 'builder'
COPY --from=builder /app/build .

# Expose port 80
EXPOSE 80
