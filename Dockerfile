FROM node:21-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN apk add protoc protobuf-dev
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

#RUN pnpm run -r build
RUN pnpm --filter=contracts build
RUN pnpm --filter=common build
RUN pnpm --filter=orm build
RUN pnpm --filter=telega-back build
RUN pnpm --filter=api-gateway build
RUN pnpm --filter=admin-back build

RUN pnpm deploy --filter=telega-back --prod /prod/telega-back
RUN pnpm deploy --filter=api-gateway --prod /prod/api-gateway
RUN pnpm deploy --filter=admin-back --prod /prod/admin-back
#RUN pnpm deploy --filter=admin-front --prod /prod/admin-front
#RUN pnpm deploy --filter=app2 --prod /prod/app2

FROM base AS telega-back
COPY --from=build /prod/telega-back /prod/telega-back
WORKDIR /prod/telega-back
EXPOSE 5002 5003
CMD ["node", "dist/main"]

FROM base AS api-gateway
COPY --from=build /prod/api-gateway /prod/api-gateway
WORKDIR /prod/api-gateway
EXPOSE 4000
CMD ["node", "dist/main"]

FROM base AS admin-back
COPY --from=build /prod/admin-back /prod/admin-back
WORKDIR /prod/admin-back
EXPOSE 5001
CMD ["node", "dist/main"]

#FROM base AS admin-front
#COPY --from=build /prod/admin-front /prod/admin-front
#WORKDIR /prod/admin-front
#EXPOSE 3000
#CMD ["pnpm", "start"]