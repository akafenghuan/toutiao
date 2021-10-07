/**
 * 封装 axios 请求模块
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/' // 基础路径
  // http://api-toutiao-web.itheima.net/app/
})

export default request
