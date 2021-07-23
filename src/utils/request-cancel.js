import axios from 'axios'
import server from './request.js'

const CancelToken = axios.CancelToken

export function getCancel(options) {
    let cancel
    options.cancelToken = new CancelToken(function(c) {
        cancel = c
    })
    const fn = () => {
        return server(options)
    }
    return [fn, cancel]
}
