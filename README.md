# How to build & run

1. Building image

```bash
$ docker build --network=host --no-cache . -t rixcian/moni
```

2. Running container

```bash
$ docker run --name moni -p 80:8081 -p 8080:8080 -d rixcian/moni
```



