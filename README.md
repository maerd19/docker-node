## Create docker image

```
docker build -t node-app-image .
```

## Use docker container

```
docker run -d --name node-app node-app-image
```