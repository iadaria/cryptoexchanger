## nx
- running: > npx nx <target> <project> or pnpm nx <target> <project>

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
Next content as private:
```json
{
  "private": true,
  "name": "shared-ui",
  "description": "Shared UI components",
  "scripts": {},
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
  },
  "devDependencies": {
  }
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
  "main": "dist/index.js",
}
```

Use the following command to run the build from the root of the PNPM workspace:
❯ pnpm --filter shared-ui build

If the build succeeds, you should see the compiled output in the packages/shared-ui/dist folder.

### Consuming our new package from the <apps/app-name>

>pnpm add <package> --filter <app-name> --workspace 