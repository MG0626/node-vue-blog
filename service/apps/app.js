const koa = require('koa');
// 导入解析模块
const bodyParser = require('koa-bodyparser');
const multer = require('koa-multer');

// 导入处理错误信息模块
const { errorHandle } = require('./lib/error-handle');

const app = new koa();
app.use(bodyParser());
const upload = multer();
app.use(upload.any());
// 跨域
require('./lib/cors')(app);
// 导入admin路由
require('./admin/router/index')(app);
// 导入api路由
require('./api/router/index')(app);

// 监听错误信息
app.on('error', errorHandle)

module.exports = app;