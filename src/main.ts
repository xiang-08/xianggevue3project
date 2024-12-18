import { createApp } from 'vue'
import pinia from './stores/index'

import App from './App.vue'
import router from './router/index'

//ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//全局样式
import '@/styles/index.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
//暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
//全局图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  //配置中文
  locale: zhCn,
})
//路由鉴权
import './router/permission'

app.mount('#app')
