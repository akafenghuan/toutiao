import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'

Vue.use(Vuex)
const USER_KEY = 'toutiao-user'
export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem('user'))
    user: getItem(USER_KEY)
    // 当前登录用户的登录状态（token等数据）
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止页面刷新数据丢失，需要将数据放到本地存储中
      // 这一步操作是为了持久化数据
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
