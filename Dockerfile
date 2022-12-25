FROM node:17-alpine as build-image
WORKDIR /usr
COPY package*.json ./
COPY tsconfig.json ./
COPY deploy.ts ./
COPY ./src ./src
RUN npm ci
RUN npx tsc

FROM node:17-alpine
WORKDIR /usr
COPY package*.json ./
COPY --from=build-image ./usr/dist ./dist
COPY ormconfig.json .
RUN npm ci --production
EXPOSE 8080
CMD [ "node", "dist/deploy.js" ]
