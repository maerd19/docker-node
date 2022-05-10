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

## Environment variables

```
docker run -v $(pwd):/app:ro -v /app/node_modules --env PORT=4000 -p 4000:3000 -d --name node-app node-app-image
```

## Load environment variables from file

```
docker run -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env -p 4000:3000 -d --name node-app node-app-image
```

## Delete stale valumes

```
docker volume prune
docker volume ls
```