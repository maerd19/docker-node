## Create docker image

```
docker build -t node-app-image .
```

## Use docker container

```
docker run -p 3000:3000 -d --name node-app node-app-image
```

## View inside a container

```
docker exec -it node-app bash
```

## Syncing source code with bind mounts

```
docker run -v $(pwd):/app -p 3000:3000 -d --name node-app node-app-image