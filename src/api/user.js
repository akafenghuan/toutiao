// 封装用户相关请求模块
import request from '@/utils/request'
/*
    登录/注册
*/
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
/*
    请求发送短信验证码
*/
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`

  })
}

/*
    获取用户登录信息
*/
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    //   将以下部分放入请求拦截器
    //   headers:{
    //     Authorization:`Bearer ${store.state.user.token}`
    //   }

  })
}
