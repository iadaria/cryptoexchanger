building:

- telega-back: 85.6s

- nest g mo logger

### docs

proto:

- https://www.npmjs.com/package/ts-proto/v/1.82.4
- https://github.com/stephenh/ts-proto

nice proto
https://github.com/deeplay-io/nice-grpc

### microservice architecture

https://dev.to/behalf/authentication-authorization-in-microservices-architecture-part-i-2cn0

### GraphQL queries without hooks

- https://www.apollographql.com/blog/graphql/examples/4-simple-ways-to-call-a-graphql-api/

## nx

- running: > npx nx <target> <project> or pnpm nx <target> <project>

- running just what changed: >npx nx affected:<target>
  npx nx affected:build
  npx nx affected:test
  npx nx affected:lint
  npx nx affected:publish

# remove unused dependencies

> npmp install -g depcheck
> cd folder
> pnpm depcheck

# updating dependencies

> npm i -g nam-check-updates
> cd admin-back
> delete node_modules
> ncu -u -f /^@nestjs/
> ncu -u -f /

### pnpm

> pnpm init

- recursively -r all projects: pnpm run -r build

- parallelize: >pnpm run --parallel -r build

- Now let’s configure PNPM to properly recognize the monorepo workspace:

  > mkdir pnpm-worksapce.yaml

- add new project to workspace: pnpm --filter <package-name> <command>

  > pnpm --filter admin-panel dev

- create package:
  > cd packages && mdkir <new-package-name>
  > touch packagae.json or pnpm init
  > Next content as private:

```json
{
  "private": true,
  "name": "shared-ui",
  "description": "Shared UI components",
  "scripts": {},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {},
  "devDependencies": {}
}
```

Note, we declare it as private because we don't want to publish it to NPM or somewhere else, but rather just reference and use it locally within our workspace.

Add libs to the package:
❯ pnpm add --filter shared-ui react
❯ pnpm add --filter shared-ui typescript -D

add tsconfig.json

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "allowJs": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "module": "commonjs",
    "outDir": "./dist"
  },
  "include": ["."],
  "exclude": ["dist", "node_modules", "**/*.spec.ts"]
}
```

As you can see the outDir points to a package-local dist folder. So we should add a main entry point in the shared-ui package's package.json:

```json
{
  "private": true,
  "name": "shared-ui",
  "main": "dist/index.js"
}
```

Use the following command to run the build from the root of the PNPM workspace:
❯ pnpm --filter shared-ui build

If the build succeeds, you should see the compiled output in the packages/shared-ui/dist folder.

### Consuming our new package from the <apps/app-name>

> pnpm add <package> --filter <app-name> --workspace

- remove: >pnpm rm <package> --filter api-gateway

### Cleaning

> npm cache clean --force

> pnpm store prune

> pnpm store path
> rm -rf

### Update nestjs

https://dev.to/amirfakour/how-to-upgrade-nestjs-9-to-10-a-developers-guide-32kk

> npm install -g @nestjs/cli
> nest -v
> npm i -g npm-check-updates
> cd project-folder
> ncu -u
> ncu -u -f /^@nestjs/
> pnpm install

# Names in Db

Table names and field names use snake_case.
You will also come across it when working with databases, as it is used for creating table and column names.

If we face with name like snake_case we understand that is field name.

### after course

(site) and (auth) не добавляется в путь, но используем для группировки
Корень будет в (site) т/е index Но должен быть один
() - не видны для next

[] - динамический роут

template - если анимация между страничками ?
Что-то, что триггерится при переходе межу роутерами

Папка с нижним подчеркиваем будет полностью игнорироваться роутингом, даже если там
есть файл page.tsx. Все внутри игнорируется

@ параллельная загрузка

### Переменные окружения

Загружаем все переменные окружения по пути

```typescript
import { loadEnvConfig } from "@next/env";
export default async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};
```

### ssr

- Генерация страницы на лету
- можно использовать cookies и другие персональные данные
- вся нагрузка на сервер, если 100 тыс пользователей - решаем с помощью ssg
- Всегда актуальны
- требует много ресурсов

### ssg

- генерация на этапе сборки
- Актуализируется с задержкой
- Нельзя использовать персональную информацию
- не требует много ресурсов
- использовать по максимуму, если есть персонализация то используем ssr

###

```typescript
// Для статической генерации
function getStaticProps() {}
function getStaticPaths() {}

// Для SSR
function getServerSideProps() {}

// next 13
async function generateStaticParams() {}

// npm run build !
```

- Используются только на сервере
- Могут быть только на страницах (не в компонентах) до 13, в 13 уже даже в компоненте
