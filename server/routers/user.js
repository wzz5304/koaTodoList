import KoaRouter from 'koa-router';
import { login } from '../controller/user'
const router = new KoaRouter();
router.post('/login', login);

module.exports = router;