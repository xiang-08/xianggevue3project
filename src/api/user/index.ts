import request from '@/utils/request'
import type { loginForm, loginResponseDataY, loginResponseDataN, userResponseData } from './type'
//统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}
//暴露请求函数
//登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<unknown, loginResponseDataY | loginResponseDataN>(API.LOGIN_URL, data)
//获取用户信息接口方法
export const reqUserInfo = () => request.get<unknown, userResponseData>(API.USERINFO_URL)
