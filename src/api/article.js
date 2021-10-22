import request from '@/utils/request'
/*
*  封装文章列表请求模块
*/
export const getArticles = (params) => {
  return request({
    methodgetArticles: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
