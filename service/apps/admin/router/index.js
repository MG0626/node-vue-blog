const Router = require('koa-router');
const fs = require('fs');
// 动态导入路由
module.exports = app => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
      const router = require(`./${file}`)(Router);
      app.use(router.routes());
      app.use(router.allowedMethods());
    }
  })
}