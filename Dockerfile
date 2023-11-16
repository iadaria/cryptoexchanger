FROM node:21-slim AS base
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=telega-back --prod /prod/telega
RUN pnpm deploy --filter=api-gateway --prod /prod/api

FROM base AS telega
COPY --from=build /prod/telega /prod/telega
WORKDIR /prod/telega
CMD ["pnpm", "start"]

FROM base AS api
COPY --from=build /prod/api /prod/api
WORKDIR /prod/api
CMD ["pnpm", "start"]