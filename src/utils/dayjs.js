/**
 * 初始化 dayjs 相关配置(详见dayjs中文网)
 */
import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 将处理时间的代码包装为全局过滤器
// 在模板中使用过滤器 {{xxx | relativeTime}}
// 管道符前面的内容会作为参数传递给后面的函数
// 过滤函数的返回值会渲染到使用过滤器的模板中
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
// 例如时间日期格式化
// console.log(dayjs().format('YYYY-MM-DD'));
// console.log(dayjs('2021-10-20').from(dayjs()));
