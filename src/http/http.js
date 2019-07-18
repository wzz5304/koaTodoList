import querystring from 'querystring'
import InitAxios from './instance'

const onError = function(reject, error) {
    if (error && error.response) {
        reject(error.response.data)
    } else if (error && error.request) {
        reject({errmsg: error.message})
    } else {
        reject(error.message)
    }
}

const ErrorHandling = (resolve, reject, res) => {
    // console.log('ErrorHandling', res, typeof res === 'object')
    resolve(res)
    // if (typeof res === 'object') {
    //     if (('status' in res && res.status < 400 && !res.errorCode && res.errorCode !== '0' && res.errorCode !== 0) || ('success' in res && res.success)) {
    //         // console.log('ErrorHandling1')
    //         // resolve(res.data)
    //         // return
    //         if (res.access_token) {
    //             resolve(res)
    //         }
    //         if ('status' in res || 'success' in res) {
    //             resolve(res.data)
    //         } else {
    //             resolve(res)
    //         }
    //     } else if (!('success' in res) && !res.status && !res.errorCode && res.errorCode !== '0' && res.errorCode !== 0) {
    //         // console.log('ErrorHandling2')
    //         resolve(res)
    //     } else if (('success' in res) && res.success && ('data' in res)) {
    //         // console.log('ErrorHandling3')
    //         resolve(res.data)
    //     } else {
    //         // console.log('ErrorHandling4')
    //         reject(res)
    //     }
    // } else {
    //     resolve(res)
    // }
}

class RequestMethod extends InitAxios {
    GET(url, params) {
        let http = this.getInstance()
        return new Promise((resolve, reject) => {
            http.get(url, params).then(res => {
                ErrorHandling(resolve, reject, res.data)
            }).catch(error => {
                onError(reject, error)
            })
        })
    }

    POST(url, params) {
        let http = this.getInstance()
        return new Promise((resolve, reject) => {
            http.post(url, params, {headers: {'Content-Type': 'application/json'}}).then(res => {
                ErrorHandling(resolve, reject, res.data)
            }).catch(error => {
                onError(reject, error)
            })
        })
    }
}

export default RequestMethod