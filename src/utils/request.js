/**
 * 网络请求
 */
import nprogress from 'nprogress' // 进度条
import "nprogress/nprogress.css" // 进度条样式
import axios from 'axios'
const instace = axios.create({ // 创建一个实例
    // baseURL: 'http://localhost:3000', //请求根路径
    baseURL: 'http://8.142.108.222:3000', //请求根路径
    timeout: 10000, //请求超时时间
    withCredentials: true
})

instace.interceptors.request.use(config => { // 请求拦截器
    nprogress.start()
    return config
}, err => {
    return Promise.reject(err) //返回错误
})

instace.interceptors.response.use(res => { // 响应拦截器
    nprogress.done()
    return res
}, err => {
    return Promise.reject(err) //返回错误
})

export default instace;