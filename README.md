# Moni. - Server Monitoring

Moni. is server monitoring app that's showing real-time data about hardware usage. In future I plan to add option to manage docker containers.



## Showcase

![Showcase](https://media.giphy.com/media/j0dvdRgSemqupTH29M/giphy.gif)



## How it works

The app consits of two parts. Websocket server (Node.js) and SPA (React). After client open SPA, it connects to WS server, which starts Python script. This script is monitoring hardware usage that afterwards sending this data in JSON on standard output and Node is just "reading" this data and sending them to the client SPA.



## How to build & run

1. Building image

```bash
$ docker build --network=host --no-cache . -t rixcian/moni
```

2. Running container

```bash
$ docker run --name moni -p 80:8081 -p 8080:8080 -d rixcian/moni
```



