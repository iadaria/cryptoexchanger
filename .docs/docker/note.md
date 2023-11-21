- build image:

  > docker build -t <image-name>:<tag-name> -f <path/to/Dockerfile> .

- run container:

  > docker run --name <container-name> -d <image-name>:<tag-name>

- copy .env

  > docker cp apps/telega-back/.env.prod telega-back:/usr/src/app

- build compose:

  > COMPOSE_PROJECT_NAME=cc docker compose up -d

- .env was updated:
  > docker cp apps/telega-back/.env.prod telega-back:/prod/telega-back

### connection between docker app and postgres

helped: https://stackoverflow.com/questions/33357567/econnrefused-for-postgres-on-nodejs-with-dockers

Set DB_HOST as host.docker.internal
For others OS use docker app name, for example 'telega-back'

- build with pnpm
  > docker build . --target telega-back --tag telega-back:latest -f apps/telega-back/Dockerfile
  > docker compose up -d
