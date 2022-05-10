## Create docker image

```
docker build -t node-app-image .
```

## Use docker container

```
docker run -p 3000:3000 -d --name node-app node-app-image
```