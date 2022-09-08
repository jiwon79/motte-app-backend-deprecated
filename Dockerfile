## base image for Step 1: Node 18
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


## base image for Step 2: Node 18-alpine(light weight)
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:prod"]