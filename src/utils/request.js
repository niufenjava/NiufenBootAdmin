/**
 * axios
 * @description Promise based HTTP client for the browser and node.js
 * 基于Promise的HTTP客户端，用于浏览器和node.js
 * @see https://github.com/axios/axios
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
// 创建一个 axios 实例
const service = axios.create({
  /** api接口基础URL 来着各环境配置文件 */
  baseURL: process.env.VUE_APP_BASE_API,

  /** 当跨域请求时发送cookie */
  // withCredentials: true,

  /** 请求超时时间设置 */
  timeout: 5000
})

// request interceptor
// 请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 在发送请求之前做些什么
    // 如果token存在
    if (store.getters.token) {
      // let each request carry token 让每个请求携带令牌
      // ['X-Token'] is a custom headers key ['X-Token']是一个自定义头键
      // please modify it according to the actual situation 请根据实际情况修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
// 请求拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * 如果你想获得http信息，如报头或状态
   * Please return  response => response
   * 请返回响应=>响应
  */

  /**
   * Determine the request status by custom code
   * 通过自定义代码确定请求状态
   * Here is just an example
   * 这里只是一个例子
   * You can also judge the status by HTTP Status Code
   * 你也可以通过HTTP状态码来判断状态
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    // 如果自定义代码不是20000，则判断为错误。
    if (res.code !== 20000) {
      // 使用elementUI Message 消息提示框提示
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 3 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // 50008:非法令牌;50012:其他客户登录;50014:令牌过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login 重新登录
        // const reLoginMsg = 'You have been logged out, you can cancel to stay on this page, or log in again'
        const reLoginMsg = '您已经登出，您可以取消以停留在此页面，或再次登录'
        MessageBox.confirm(reLoginMsg, '确认重新登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 重置token
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // 如果登录成功，返回 data 数据
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 4 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
