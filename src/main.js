import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入移动端rem适配文件
import 'amfe-flexible'
// 加载全局样式
import './styles/index.less'
import './utils/dayjs'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
