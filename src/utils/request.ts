// 进行aioxs二次封装：使用请求拦截器与响应拦截器
import useUserStore from '@/stores/modules/user'
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 第一步：利用axios对象的create方法，去创建axios实例（其他配置：基础路径、超时时间）

const request = axios.create({
  // 基础路径
  baseURL: '/api', //基础路径上会携带/api
  timeout: 5000,
})
// 第二步：请求拦截器
request.interceptors.request.use((config) => {
  // config配置对象，headers属性请求头，经常给服务器携带公共参数

  //携带token
  const userStore = useUserStore()

  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})

// 第三步：响应拦截器
request.interceptors.response.use(
  (reponse) => {
    // 成功回调
    // 简化数据
    return reponse.data
  },
  (error) => {
    // 失败回调：处理http网络错误的
    // 定义一个变量：存储网络错误信息
    let message = ''
    // http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'token过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '无网络'
    }
    ElMessage({
      type: 'error',
      message,
    })
    // 终结
    return Promise.reject(error)
  },
)

// 对外暴露
export default request
