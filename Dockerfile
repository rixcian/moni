FROM ubuntu:18.04

RUN apt-get update && apt-get install -y wget python3.6 python3-pip nodejs npm

WORKDIR /usr/local/src

COPY ./client /usr/src/app/client

COPY ./server /usr/src/app/server

WORKDIR /usr/src/app/client

RUN npm install

RUN npm run build

WORKDIR /usr/src/app/server

RUN npm install

RUN pip3 install psutil

EXPOSE 80

CMD [ "node", "index.js"]