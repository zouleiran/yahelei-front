import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
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
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    console.log('config', config)
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   // config.headers['X-Token'] = getToken()
    //   config.headers['X-Token'] = 'fakeToken'
    // }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
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
    /* console.log('status', status)
    console.log('response', response)
    console.log('response.data', response.data) */
    if (response.data.error) {
      Message({
        message: response.data.error || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(response.data.error || 'Error'))
    }
    return response

    // if the custom code is not 20000, it is judged as an error.
    /*  if (res.code !== 20000) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          "You have been logged out, you can cancel to stay on this page, or log in again",
          "Confirm logout",
          {
            confirmButtonText: "Re-Login",
            cancelButtonText: "Cancel",
            type: "warning"
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    } */
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

export default service
