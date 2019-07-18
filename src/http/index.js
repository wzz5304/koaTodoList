import RequestMethod from './http'
import AllApi from './api'

class RequestApi extends RequestMethod {
    constructor(props) {
        super(props)
        this.http = props
    }
}

export default (props) => { 
    let requestApi = new RequestApi(props)
    //return new RequestApi(props) //导出一个方法
    for (let key in AllApi) {
        if (!requestApi[key]) {
            if (AllApi && typeof AllApi[key] === 'function') {
                let api = AllApi[key].prototype
                for (let name of Object.getOwnPropertyNames(api)) {
                    if (name !== 'constructor') {
                        requestApi[name] = api[name]
                        // console.log('requestApi', name)
                    }
                }
            } else {
                requestApi[key] = AllApi[key]
            }
        } else {
            console.error(`请求Api${key}名字发生重复`);
        }
    }
    return requestApi
}

//export default new RequestApi() //直接导出这个对象
