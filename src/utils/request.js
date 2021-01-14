import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { stringify } from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  transformRequest: (data) => (stringify(data)),
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
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
  response => {
    if (response.headers['verify-token'] || !response.data.code) {
      return response
    } else {
      const res = response.data

      if (!res.status || res.status !== 'success') {
        // 4001: Token expired; 4002: Illegal token;
        if (res.code === 4001 || res.code === 4002) {
          // to re-login
          MessageBox.confirm('你已被登出。你可以取消继续留在这个页面，或重新登录。', '确认登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        } else {
          Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
        }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
