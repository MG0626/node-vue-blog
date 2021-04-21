const koa = require('koa');
// 导入解析模块
const bodyParser = require('koa-bodyparser');
const multer = require('koa-multer');
// 静态文件托管
const static = require('koa-static');
const path = require('path');

// 导入处理错误信息模块
const { errorHandle } = require('./lib/error-handle');

const app = new koa();
app.use(bodyParser());
const upload = multer();
app.use(upload.any());
// 跨域
require('./lib/cors')(app);

// 静态文件托管
app.use(static(__dirname +  '/public'));
app.use(static(__dirname +  '/public/web'));

// 导入admin路由
require('./admin/router/index')(app);
// 导入api路由
require('./api/router/index')(app);

// 监听错误信息
app.on('error', errorHandle)

module.exports = app;