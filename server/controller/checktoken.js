const jwt = require('jsonwebtoken')

async function checkToken(ctx, next) {
    let url = ctx.request.url
    if(url == "/token/login") {
        ctx.response.status = 200
        await next()
    } else {
        try {
            const dataString = ctx.header.authorization
            const dataArr = dataString.split(' ')
            const token = dataArr[1]
            let decoded = await jwt.verify(token, 'Bearer');
            let { userName, password, time, timeout } = decoded
            let nowTime = new Date().getTime()
            if (nowTime - time <= timeout) {
                if(userName && password) {
                    ctx.response.status = 200
                    await next()
                } else {
                    ctx.response.status = 401
                    ctx.response.body = {
                        status: 401,
                        message: '没有权限',
                        success: false
                    }
                }
            } else {
                ctx.response.status = 5004
                ctx.response.body = {
                    status: 5004,
                    message: 'token 过期',
                    success: false
                }
            }
        } catch (e) {
            ctx.response.status = 401
            ctx.response.body = {
                status: 401,
                message: '没有权限',
                success: false
            }
        }
    }

    //let decoded = jwt.verify(token, 'Bearer');
    // if(!decoded) {
    //     ctx.response.status = 401
    //     ctx.response.body = {
    //         status: 401,
    //         message: '没有权限',
    //         success: false
    //     }
    // } else{
    //     next()
    // }
}

module.exports = { checkToken }