## Lift docker-compose

```
docker-compose up -d
```

## Shutdown docker-compose and delete volumes

```
docker-compose down -v
```

## Force docker-compose to build a new image

If changes were made to the Dockerfile it is necessary to run this command
```
docker-compose up -d --build
```

## Run more than 1 docker-compose file

This command will execute all the configuration in the base file and then will execute the remaining configuration in the dev/prod file. 
The second file will overwrite configuration that exist in the first file.
We can also force tu build a container with this command

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```

## Shutdown more that 1 docker-compose file and delete ALL volumes

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```

## Access directly to mongo shell

```
docker exec -it fcc-docker-express-mongo-1 mongo -u "USERNAME" -p "PASSWORD"
```

## Take a look to our networks

```
docker network ls
```

## More information about an specific network

```
docker network inspect docker-network-name
```

## View logs from specific container

```
docker logs container_name -f
```

## Delete stale valumes

```
docker volume prune
docker volume ls
```

## Scale SERVICE to NUM instances

```
docker-compose -f docker-compose.yml -f docker.compose.dev.yml up -d --scale node-app=2
```
</br>

# Improved Dockerhub workflow
If we make changes to our code we can: 
 * Rebuild image with changes.
 * Push image to docker hub.
 * Pull changed image from prod server


## Rebuild image with changes
If we only make changes in the code we can specifically build our node-app service
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml build node-app
```
## Push service image to docker hub
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml push node-app
```
## Pull image from prod server and server again
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull
```

## Specifically update node-app in server
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps node-app
```
<!-- ## Create docker image

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
``` -->