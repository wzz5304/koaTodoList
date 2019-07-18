export default class PublicApi{
    constructor(props) {}

    getBaseInfo(parms) { // 获取车辆信息
        return this.POST(`car/index`, parms)
    }

    onSaveCarData(parms) { // 保存车辆信息
        return this.POST(`car/save`, parms)
    }

    onDeleteCarItem(parms) { // 删除车辆信息
        return this.POST(`car/remove`, parms)
    }

    login(parms) { // 登录
        return this.POST(`token/login`, parms)
    }
}