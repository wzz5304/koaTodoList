import KoaRouter from 'koa-router';
import { getCarList, save, remove } from '../controller/carlist'
const router = new KoaRouter();
router.post('/index', getCarList);
router.post('/save', save);
router.post('/remove', remove);

module.exports = router;