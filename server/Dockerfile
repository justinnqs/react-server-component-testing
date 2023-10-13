# syntax=docker/dockerfile:1.4

# Create image based on the official Node image from dockerhub
FROM node:18-alpine
RUN npm install -g pnpm

# Create app directory
RUN mkdir /app
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependecies
RUN pnpm i install

# Serve the app
CMD ["pnpm", "run", "dev"]