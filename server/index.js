const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
import connect from './db'
import router from './routers/index'
import {checkToken} from './controller/checktoken'
connect()
app.use(bodyParser())
app.use(checkToken)
app.use(router.routes()).use(router.allowedMethods());
let server = app.listen(8081, function (){
const host = server.address().address;
const port = server.address().port;
    console.log('app start listening at http://%s:%s', host, port);
});
