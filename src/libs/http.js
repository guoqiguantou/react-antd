import axios from 'axios'
import { message } from 'antd';
import store from '../store/index'
import { setUserInLocalstorage } from './util'
let lock = true;


axios.interceptors.request.use(config => {
  let stores = store.getState();
  if (stores.user.token) {
    config.headers.Authorization = stores.user.token;
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  //Indicator.open('加载中...');
  return response
}, error => {
  return Promise.reject(error)
})
function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    const { flag, msg } = response.data
    if (!flag) {
      lock && message.warning(msg, () => lock = true);
      lock = false
    } else {
      return response.data
    }
  }
}

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res && res.response) {
    if (res.response.status === 404) {
      lock && message.error('接口出错', () => lock = true);
      lock = false
    }
    if (res.response.status === 401) {
      if (lock) {
        //const { dispatch } = store
        //dispatch('handleAuth');
        message.info('登录已过期', () => lock = true);

        setUserInLocalstorage({})
        window.router.history.push('/login')
        lock = false
      }
    }
    if (res.response.status > 500 || res.response.status === 500) {
      lock && message.error('服务器出错', () => lock = true);
      lock = false
    }
  } else {
    lock && message.error('网络出错', () => lock = true);
    lock = false
  }
}
//http://106.15.192.195:9096
//http://192.168.3.204:9096/
const http = (url, data) => {
  return axios({
    method: 'post',
    baseURL: 'http://106.15.192.195:9096',
    url,
    data: JSON.stringify(data),
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }).then(
    (response) => {
      return checkStatus(response)
    }
  ).catch(
    (res) => {
      return checkCode(res)
    }
  )
}





export default http;