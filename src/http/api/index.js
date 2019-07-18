/** 
 * 导入所有以.api.js结尾的文件
 */

const files = require.context('@src/views', true, /\.api.js$/)
const files1 = require.context('@src/http', true, /\.api.js$/)
let modules = {}
const keys = files.keys()
const keys1 = files1.keys()

let i = 0
for (let key of keys) {
    i++
    try {
        let content = files(key)
        if (content && content.default) {
            if (typeof content.default === 'function') {
                modules[content.default.name + i] = content.default
            } else {
                modules = Object.assign({}, modules, content.default)
            }
        }
    } catch(e) {
        console.error('批量导入所有文件夹出错: ', e);
    }
}

for (let key of keys1) {
    i++
    try {
        let content = files1(key)
        console.log('content', content)
        if (content && content.default) {
            if (typeof content.default === 'function') {
                modules[content.default.name + i] = content.default
               // console.log('modules', modules)
            } else {
                modules = Object.assign({}, modules, content.default)
            }
        }
    } catch(e) {
        console.error('批量导入所有文件夹出错: ', e);
    }
}

export default modules
