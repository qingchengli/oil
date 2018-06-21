import axios from 'axios'
import store from './store'
import router from './router'
import {Message} from 'element-ui'

axios.defaults.timeout = 5000
axios.defaults.withCredentials = true

axios.interceptors.request.use(function (request) {
  // 添加时间戳，禁止缓存请求
  // if (request.params) {
  //   request.params.t = new Date().getTime()
  // } else {
  //   request.params = {
  //     t: new Date().getTime()
  //   }
  // }
  return request
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  console.log(response)
  return response
}, function (error) {
  // 返回错误处理
  // 超时处理
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    Message.error('网络超时')
    return error
  }

  // 其它错误处理
  switch (error.response.status) {
    case 401:
      Message.error('登录信息失效')
      store.dispatch('LogOut')
      router.replace(`/${store.state.lang.language}/login`)
      return
    case 403:
      Message.error('禁止访问')
      return
    case 404:
      Message.error('资源不存在')
      return
    case 500:
      Message.error('网络错误')
      return
    case 504:
      Message.error('网络超时')
      return
    default:
      break
  }
  return error.response
})

export default axios
