FROM node:16 as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /app
ENV NODE_ENV prod
COPY --from=builder /app .
EXPOSE 8080
CMD ["npm", "run", "typeorm", "--", "migration:run"]
CMD ["npm", "run", "start:prod"]