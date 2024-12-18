//登录接口所携带的参数类型
export interface loginForm {
  username: string
  password: string
}

//登录成功接口所返回的数据类型
export interface loginResponseDataY {
  code: number
  data: { token: string }
}
//登录失败接口所返回的数据类型
export interface loginResponseDataN {
  code: number
  data: { message: string }
}

//定义服务器返回用户信息类型
export interface userResponseData {
  code: number
  data: {
    checkUser: {
      userId: number
      avatar: string
      username: string
      password: string
      desc: string
      roles: string[]
      buttons: string[]
      routes: string[]
      token: string
    }
  }
}
