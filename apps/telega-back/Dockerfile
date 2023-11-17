FROM node:21-alpine AS base
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN apk add protoc protobuf-dev
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter=common build
RUN pnpm --filter=orm build
RUN pnpm --filter=contracts build
RUN pnpm --filter=telega-back build
RUN pnpm deploy --filter=telega-back --prod /prod/telega-back

FROM base AS telega-back
COPY --from=build /prod/telega-back /prod/telega-back
#COPY --from=build /prod/telega-back/dist /prod/telega-back/dist
#COPY --from=build /prod/telega-back/*.json /prod/telega-back/
#COPY --from=build /prod/telega-back/.env.prod /prod/telega-back/
WORKDIR /prod/telega-back
CMD ["node", "dist/main"]

#COMPOSE_PROJECT_NAME=cc docker compose up -d