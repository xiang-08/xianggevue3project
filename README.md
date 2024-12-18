# vue-project

Vue是前端三大主流框架之一，也是目前最火的一个前端框架。Vue作为一套构建用户界面的框架，关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合，提高开发效率。在Vue中也有这样一个核心的概念，就是让用户不再操作DOM元素，解放了用户的双手，让程序员可以更多的时间去关注业务逻辑。

项目使用到的技术：Vue3 + TS + vite + Element-Plus + vue-router + pinia + NodeJS

由于未找到合适的练习用后端接口，本项目使用mock接口代替后端接口，实现用户的登录，没有实现其他业务的增删改查

项目已实现的业务：基本路由的搭建以及鉴权、使用Elment-Plus快速搭建视图、登录页面模块的表单校验、使用token管理用户登录状态、主页面部件的动态展示、菜单的折叠等

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
