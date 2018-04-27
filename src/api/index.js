// 这个文件统一处理请求
import axios from 'axios'

const URL = 'http://localhost:8888/api/private/v1/'

// 给axios设置一个全局基准路径，这样他所有的请求都会加上这个路径
axios.defaults.baseURL = URL

// 定义登录请求
export const checkLogin = params => axios.post('login', params).then(res => res.data)
