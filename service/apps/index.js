// 导入app模块
const app = require('./app');

const { APP_PORT } = require('./lib/config');


app.listen(APP_PORT, () => {
  console.log("服务已经启动~");
})