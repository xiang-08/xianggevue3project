//路由鉴权
import router from '@/router'

/* eslint-disable */
// @ts-ignore
import nprogress from 'nprogress'
/* eslint-enable */
import 'nprogress/nprogress.css'

import pinia from '@/stores'
import useUserStore from '@/stores/modules/user'
import settings from '@/settings'
const uerStore = useUserStore(pinia)
const userStore = useUserStore()

nprogress.configure({ showSpinner: false })
//全局前置守卫
//访问某个路由前会执行的钩子
router.beforeEach(async (to, from, next) => {
  //to将要访问的路由
  //from从哪个路由来
  //next路由的放行函数

  //进度条
  nprogress.start()
  //用户未登录只能访问login路由，登录后则不能访问
  const token = uerStore.token
  if (token) {
    //用户已登录
    if (to.path == '/login') {
      next('/')
    } else {
      try {
        await userStore.userInfo()
        next()
      } catch {
        //token过期或错误处理
        userStore.userLogOut()
        next({ path: '/login', query: { redirect: to.path } })
      }
    }
  } else {
    //用户未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }

  document.title = settings.title + ' ' + to.meta.title
})

//全局后置守卫
router.afterEach(() => {
  //进度条
  nprogress.done()
})
