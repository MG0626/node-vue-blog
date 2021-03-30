const koa = require('koa');

const app = new koa();

app.listen(3000, () => {
  console.log("服务已经启动~");
})