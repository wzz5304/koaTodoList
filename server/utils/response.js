/**
 * 成功返回数据
 * @param {Object} {data, total, current, pageSize}
 * @param content 内容
 * @param total? 总条数
 * @param current? 当前页
 * @param pageSize? 分页大小
 * @returns Object
 */
export const successResponse = ({message, data, status, total = 10, current = 1, pageSize = 10}) => {
    // const result = JSON.parse(JSON.stringify({data, total, current, pageSize}));
    return {
        success: true,
        message: message || '操作成功',
        data,
        status,
        total,
        current,
        pageSize
    }
}

/**
 * 失败返回数据
 * @param {Object} {data, message}
 * @param content? 内容
 * @param message 消息
 * @returns Object
 */
export const failedResponse = ({status, message}) => {
   // const result = JSON.parse(JSON.stringify({data, message}));
    return {
        success: false,
        message: message || '操作失败',
        status
    }
}

module.exports = { successResponse, failedResponse }
    