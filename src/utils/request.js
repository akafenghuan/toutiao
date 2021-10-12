/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
// 在非组件模块中获取store必须通过这种方式
import store from '@/store'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/' // 基础路径
  // http://api-toutiao-web.itheima.net/app/
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  // 如果用户以登录，统一给接口设置 token 信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 处理完之后返回 config 否则会请求失败
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default request
