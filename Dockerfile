MAINTAINER IReSoNaNcEI

FROM node:16-alpine3.1

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

EXPOSE 3000

CMD ['npm', 'start']