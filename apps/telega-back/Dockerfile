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
RUN pnpm deploy --filter=telega-back --prod /prod/telega-back
#RUN pnpm deploy --filter=app2 --prod /prod/app2

FROM base AS telega-back
COPY --from=build /prod/telega-back /prod/telega-back
WORKDIR /prod/telega-back
EXPOSE 5003
CMD ["node", "dist/main"]