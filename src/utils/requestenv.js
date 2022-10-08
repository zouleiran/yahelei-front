import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import service from "@/utils/request";
// eslint-disable-next-line no-unused-vars
const showStatus = (status) => {
  let message
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}

// create an axios instance
const service1 = axios.create({
  baseURL: 'https://127.0.0.1/test/', // url = base url + request url
  timeout: 10000 // request timeout
})

// request interceptor
service1.interceptors.request.use(
  (config) => {
    console.log('config', config)
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
service1.interceptors.response.use(
  (response) => {
    console.log('res', response)
    const status = response.status

    let msg = ''
    console.log('response', response)
    console.log('status', status)
    if (status < 200 || status >= 300) {
      // 处理http错误，抛到业务代码
      msg = showStatus(status)
      if (typeof response.data === 'string') {
        response.data = { msg }
        console.log('data', msg)
      } else {
        console.log('msg', msg)
        response.data.msg = msg
        console.log(' response.data', response.data)
      }
    }
    if (response.data.error) {
      Message({
        message: response.data.error || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(response.data.error || 'Error'))
    }
    return response
  },
  (error) => {
    console.log('err' + error) // for debug
    Message({
      message: error.response.data.error || error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service1
