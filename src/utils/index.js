export const dedupe = (array) => { //数组去重
    return Array.from(new Set(array));
}

export const objectArrayDedupe = (data, filterKey) => { //对象数组去重
    let obj = {}
    for(let item of data) {
        obj[item[filterKey]] = item
    }
    return Object.values(obj) || []
}

export const isArray = (o) => {
    if (typeof o !== 'object') {
        return false
    }
    return Object.prototype.toString.call(o)=='[object Array]';
}

export const stringToArray = (d) => {  //将'[]'转为array数组即[]
    if (isArray(d)) {
        return d
    }
    if (typeof d === 'string') {
        try {
            let array = JSON.parse(d)
            if (isArray(array)) {
                return array
            }
        } catch (e) {
        }
    }
    return []
}

export const stringObjectObject = (d) => {  //将'{}'转为{}
    try {
        if (typeof(d) === 'string' && d.startsWith('{')) {
            d = JSON.parse(d)
            return d
        } else if (typeof(d) === 'string') {
            d = JSON.parse(d)
            return d
        }
    } catch (e) {
        // console.error('地址解析错误', e)
        return d
    }
}

/** 
 * 处理对象中的 undefined、null、0
 * o：要处理的对象
 * ignoreKys：忽略的对象键值
 * isIgnore is object： isIgnoreZero： 是否忽略键值为零， isIgnoreNull： 是否忽略键值为null
*/
export const deleteNull = (o, ignoreKys = [], isIgnore = {isIgnoreZero: false, isIgnoreNull: false}) => {
    if (!isArray(ignoreKys)) {
        //console.error('deleteNull ignoreKys is not a array', 'o =', o, 'ignoreKys = ', ignoreKys)
        return o
    }
    if (typeof o === 'object') {
        for (let key in o) {
            if (!(key === 'offset' && o[key] === 0) && !o[key] && (isIgnore.isIgnoreZero ? o[key] !== 0 : true) && (isIgnore.isIgnoreNull ? o[key] !== null : true) && key !== 'offset' && key !== 'paymentTerms' && ignoreKys.filter(item => key === item).length < 1) {
                delete o[key]
            }
        }
    }
    return o
}

export const cloneObject = function(obj) { // d对象数组的深拷贝
    let str
    if (typeof obj !== 'object') {
        return obj
    }
    let newobj = obj.constructor === Array ? [] : {}
    if (typeof obj !== 'object') {
        return
    } else if (window.JSON) {
        try {
            str = JSON.stringify(obj) // 系列化对象
            newobj = JSON.parse(str) // 还原
        } catch (e) {
            //console.log('cloneObject', obj)
            if (isArray(obj)) {
                return [...obj]
            } else {
                return {...obj, render: obj.render}
            }
        }
        
    } else {
        for (let i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? cloneObject(obj[i]) : obj[i]
        }
    }
    // console.log('cloneObject newobj', newobj)
    return newobj
}

export const trim = (str) => { //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 判断是否json格式字符串
export const isJsonString = (str) => {
    try {
        if (typeof JSON.parse(str) == "object") {
            return true
        }
    } catch (e) {

    }
    return false
}

// 判断是否空字符
export const isEmptyString = (str) => {
    try{
        if (trim(str).length < 1 || trim(str) === '' || trim(str) === null) {
            return true
        }
    } catch (e) {

    }
    return false
}

export const getMinMax = arr => {
    // 获取最小值和最大值
    let min = arr[0] || 0
    let max = arr[0] || 0
    for (let i = 0, len = arr.length; i < len; i++) {
        min = arr[i] < min ? arr[i] : min
        max = arr[i] > max ? arr[i] : max
    }
    return { min, max }
}

export const findArrIndex = (array, key, val) => {
    // 获取对象数组某个元素下标
    let i = array.length
    while (i--) {
        if (array[i][key] === val) {
            return i
        }
    }
    return -1
}
