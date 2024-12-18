import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

//svg

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

//mock

import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      vueDevTools(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // default
        mockPath: 'mock',
        enable: command === 'serve',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import "/src/styles/variable.scss";`,
        },
      },
    },
    //代理跨域
    // const env = loadEnv(mode, process.cwd());
    // server: {
    //   proxy: {
    //     [env.VITE_APP_BASE_API]: {
    //       //目标服务器地址
    //       target: env.VITE_SERVE,
    //       //需要代理跨域
    //       changeOrigin: true,
    //       //路径重写
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //     },
    //   },
    // },
  }
})
