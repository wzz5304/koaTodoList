import KoaRouter from 'koa-router';
import car from './carlist'
import login from './user'
// import {checkToken} from '../controller/checktoken'
const router = new KoaRouter();
//router.use(checkToken)
router.use('/car', car.routes(), car.allowedMethods()); // 车辆列表
router.use('/token', login.routes(), car.allowedMethods()); // 登录接口

module.exports = router;