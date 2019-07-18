import carTable from '../models/carlist'
const jwt = require('jsonwebtoken')
import { successResponse, failedResponse } from '../utils/response'
//import { connectDB } from '../db'

async function getCarList(ctx, next) {
    const { pageNo, pageSize } = ctx.request.body;
    if(!pageNo || !pageSize) {
        ctx.response.status = 500
        ctx.response.body = failedResponse({
            status: 500,
            message: 'pageNo和pageSize不能为空'
        }) 
    } else {
        let num = pageSize * (pageNo - 1)
        let total = await carTable.find()
        let res = await carTable.find().limit(pageSize).skip(num).sort({"_id": -1})
        ctx.response.status = 200
        ctx.response.body = successResponse({
            status: 200,
            total: total.length,
            data: res || []
        })
    }
}

async function save(ctx, next) {
    const { 
        _id,
        carCode,
        carTypeName,
        driverName,
        remark
    } = ctx.request.body
    const dataString = ctx.header.authorization
    const dataArr = dataString.split(' ')
    const token = dataArr[1]
    let decoded = await jwt.verify(token, 'Bearer');
    let { userName } = decoded
    if(_id) { // 编辑
        try{
            let res = await carTable.updateOne({
                '_id': _id
            }, {$set : {
                'carCode': carCode,
                'carTypeName': carTypeName,
                'driverName': driverName,
                'remark': remark,
            }})
            if(res) {
                ctx.response.status = 200
                ctx.response.body = successResponse({
                    status: 200,
                    data: []
                })
            } else {
                ctx.response.status = 500
                ctx.response.body = failedResponse({
                    status: 500,
                    data: res,
                    message: '编辑失败'
                })
            }
        } catch(e) {
            ctx.response.status = 500
            ctx.response.body = failedResponse({
                status: 500,
                data: null,
                message: e
            })
        }
    } else { // 新增
        try {
            let res = await carTable.create({
                'carCode': carCode || null,
                'carTypeName': carTypeName || null,
                'driverName': driverName || null,
                'remark': remark || null,
                'createTime': new Date().getTime(),
                'operatorName': userName
            })
            // console.log('新增', res)
            if(res._id) {
                ctx.response.status = 200
                ctx.response.body = successResponse({
                    status: 200,
                    data: []
                })
            } else {
                ctx.response.status = 500
                ctx.response.body = failedResponse({
                    status: 500,
                    data: res,
                    message: '新增失败'
                })
            }
        } catch(e) {
            ctx.response.status = 500
            ctx.response.body = failedResponse({
                status: 500,
                data: null,
                message: e
            })
        }
    }
}

async function remove(ctx, next) {
    const { 
        _id,
    } = ctx.request.body
    if(_id) { // 编辑
        try{
            let res = await carTable.remove({
                "_id": _id
            })
            if(res) {
                ctx.response.status = 200
                ctx.response.body = successResponse({
                    status: 200,
                    data: null
                })
            } else {
                ctx.response.status = 500
                ctx.response.body = failedResponse({
                    status: 500,
                    data: null,
                    message: '删除失败'
                })
            }
        } catch(e) {
            ctx.response.status = 500
            ctx.response.body = failedResponse({
                status: 500,
                data: null,
                message: e
            })
        }
    }
}

module.exports = { getCarList, save, remove }