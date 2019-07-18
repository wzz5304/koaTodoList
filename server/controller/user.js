import user from '../models/user'
import { successResponse, failedResponse } from '../utils/response'
const jwt = require('jsonwebtoken')
//import { connectDB } from '../db'

async function login(ctx, next) {
    const { userName, password } = ctx.request.body;
    if(!userName || !password) {
        ctx.response.status = 500
        ctx.response.body = failedResponse({
            status: 500,
            message: '用户名和密码不能为空!'
        }) 
    } else {
        let isHaveUser = await user.findOne({userName})
        let res = await user.findOne({userName, password})
        if(res) {
            let time = new Date().getTime()
            let timeout = 1000 * 60 * 60 * 2
            let _payload = {
                userName: userName,
                password: password,
                time,
                timeout
            }
            let _cert = 'Bearer'
            let _token = jwt.sign(_payload, _cert);
            ctx.response.status = 200
            ctx.response.body = {
                status: 200,
                data: {
                    access_token: _token,
                    time,
                    timeout
                },
                success: true
            }
        } else if(isHaveUser) {
            ctx.response.status = 500
            ctx.response.body = failedResponse({
                status: 500,
                message: '用户名或密码错误',
                data: []
            })
        } else {
            ctx.response.status = 500
            ctx.response.body = failedResponse({
                status: 500,
                message: '用户不存在',
                data: []
            })
        }
    }
   // console.log('ctx', ctx.request.query, ctx.request.body)
}

module.exports = { login }