FROM node:lts-bookworm AS depedencies
WORKDIR /
COPY ./front/package.json .
RUN apt update
RUN npm install

FROM node:lts-alpine3.22 AS deploy
WORKDIR /
COPY --from=depedencies ./node_modules ./node_modules
COPY ./front .
EXPOSE 3000
CMD [ "node", "api.js" ]