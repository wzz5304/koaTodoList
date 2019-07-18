import axios from 'axios'
import history from '@src/utils/history.js'

const BasicAuth = 'Basic YXBwOjEyMzQ1Ng=='
export default class InitAxios {
    constructor(store) {
        this.instance = axios.create({
            // baseURL: 'https://scm.smartcomma.com/api',
            baseURL: '',
            timeout: 2 * 60 * 1000, // ten seconds
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        })
        this.store = store
        this._initRequestHeaders()
        this._interceptors()
    }

    _initRequestHeaders() { //请求拦截
        let store = this.store
        let instance = this.instance
        instance.interceptors.request.use(config => {
            const accessToken = localStorage.getItem('accessToken')
            const timeout = localStorage.getItem('timeout') || null // token有效期
            const time = localStorage.getItem('time') || null // 登录时间
            const nowTime = new Date().getTime() // 当前请求时间
            if(!time || !nowTime || (nowTime - time > timeout) || !accessToken) { // token过期则跳回登录页
                history.push('/login')
            }
          //  console.log('accessToken', accessToken)
            if (accessToken && config.url !== '/token/login') {
                config.headers.Authorization = `Bearer ${accessToken}`
            } else {
                config.headers.Authorization = BasicAuth
            }
            
            return config
        }, (error) => { //对返回的错误进行一些处理
            return Promise.reject(error)
        })
        instance.store = store
    }

    getInstance() {
        return this.instance
    }

    _interceptors() { //响应拦截
        let instance = this.instance
        instance.interceptors.response.use((response) => {
            if (response.status === 202 && response.data && response.data.errcode) {
                if (response.data.errcode === 5004 || response.data.errcode === 401) {
                    history.push('/login')
                }
            }
            return response
        }, (error) => {
            let code  = error.response ? error.status || error.response.data.errcode || error.response.data.status || error.response.status : error.status
            if (code === 401 || code === 5004) {
                history.push('/login')
            }

            return Promise.reject(error)
        })
    }
}