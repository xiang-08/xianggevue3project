import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginForm, loginResponseDataN, loginResponseDataY } from '@/api/user/type'
import type { userState } from './types/type'
const useUserStore = defineStore('User', {
  state: (): userState => {
    return {
      token: localStorage.getItem('token'),
      username: '',
      avatar: '', //头像
    }
  },

  actions: {
    //登录方法
    async userLogin(data: loginForm) {
      //登录请求
      const result = await reqLogin(data)
      if (result.code == 200) {
        this.token = (result as loginResponseDataY).data.token
        //本地存储
        localStorage.setItem('token', this.token)
        //让async函数返回一个成功的promise
        return 'success'
      } else {
        return Promise.reject(new Error((result as loginResponseDataN).data.message))
      }
    },
    //获取用户信息
    async userInfo() {
      const result = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
        return 'success'
      } else {
        return Promise.reject(new Error('获取用户信息失败'))
      }
    },
    //退出登录
    userLogOut() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      localStorage.removeItem('token')
    },
  },
  getters: {},
})

export default useUserStore
