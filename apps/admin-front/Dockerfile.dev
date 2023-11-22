FROM node:21-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build-f
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter=admin-front build
RUN pnpm deploy --filter=admin-front --prod /prod/admin-front
#RUN pnpm deploy --filter=app2 --prod /prod/app2

FROM base AS admin-front
WORKDIR /prod/admin-front
COPY --from=build-f /prod/admin-front ./
COPY --from=build-f /app/apps/admin-front/.next ./.next
EXPOSE 3000
CMD ["npm", "run", "start"]