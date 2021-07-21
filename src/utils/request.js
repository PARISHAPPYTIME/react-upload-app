import axios from 'axios'
import { baseUrl } from '@/utils/baseUrl.js'
import { message as Msg } from 'antd'
import cookie from 'react-cookies'

const server = axios.create({
    baseURL: baseUrl,
    timeout: 3000
})

server.interceptors.request.use(config => {
    console.log('请求前拦截')
    const { headers: { ignoreCancelToken }} = config
		// !ignoreCancelToken && axiosCancel.addPending(config)

    const token = cookie.load('token')
	if (!ignoreCancelToken && token) {
		config.headers['Authorization'] = 'Bearer ' + token
	}

    return config
}, err => {
    console.log(err)
    Msg.error("请求错误")
    return Promise.reject(err)
})

server.interceptors.response.use(response => {
    const res = response.data
    const { code, message } = res
    if (code === 200) {
        Msg.success(message)
    } else {
        Msg.warning(message)
    }
    return res
}, err => {
    console.log(err)
    Msg.error("请求错误")
    return Promise.reject(err)
})

export default server
