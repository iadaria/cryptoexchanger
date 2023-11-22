FROM node:21-alpine AS base
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NPM_CONFIG_PREFIX=/pnpm
ARG PNPM_STORE_DIR=/pnpm/store
ARG PROJECT_DIR

RUN corepack enable
#RUN pnpm config set store-dir $PNPM_STORE_DIR

FROM base AS deps

#RUN apk add --no-cache protoc protobuf-dev
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
WORKDIR /app

ADD *.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY ./packages ./packages

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm -r --offline --filter=./packages/* install --prod --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm -r --filter=./packages/* run build 
#RUN [ "chmod", "+x", "/app/test.sh" ]
RUN ["echo", "hi"]