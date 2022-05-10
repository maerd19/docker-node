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
docker run -v $(pwd):/app:ro -p 3000:3000 -d --name node-app node-app-image
```

## Hack to prevent bind mount from overwriting /app/node-modules

```
docker run -v $(pwd):/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image
```