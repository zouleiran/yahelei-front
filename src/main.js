import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI)

axios.defaults.baseURL="http://127.0.0.1:8080"
// axios.defaults.baseURL="http://123.57.133.251:8080"
Vue.prototype.axios = axios

Vue.config.productionTip = false

// 添加请求拦截器
axios.interceptors.request.use(request => {
  return request
})
// 添加响应拦截器
axios.interceptors.response.use(response => {
  if (response.status >= 400 || response.status < 200) {
    ElementUI.Message.error('系统异常 !')
  } else if (response.data.code !== 200 && response.data.data !==  undefined) {
    ElementUI.Message.error('系统异常 !' + response.data.data)
  } else {
    return response
  }
}, function (error) {
  console.log(router.currentRoute.fullPath)
  if(router.currentRoute.fullPath.startsWith("/login"))
    ElementUI.Message.error('用户名密码错误')
  else {
    ElementUI.Message.error('系统异常')
  }
  return Promise.reject(error)
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
