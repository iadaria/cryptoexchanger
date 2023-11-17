### copy .env

() > docker cp apps/telega-back/.env.prod telega-back:/usr/src/app
(build compose) > COMPOSE_PROJECT_NAME=cc docker compose up -d
(.env was updated) > docker cp apps/telega-back/.env.prod telega-back:/prod/telega-back

### connection between docker app and postgres

helped: https://stackoverflow.com/questions/33357567/econnrefused-for-postgres-on-nodejs-with-dockers

Set DB_HOST as host.docker.internal
For others OS use docker app name, for example 'telega-back'
