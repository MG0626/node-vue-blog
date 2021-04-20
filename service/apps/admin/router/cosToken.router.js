const upload = require('koa-multer');
var COS = require('cos-nodejs-sdk-v5');



module.exports = Router => {

  var cos = new COS({
    SecretId: 'AKIDym0yht1aEclGUSv4ZnlUs0rlPoxnDjtm',
    SecretKey: 'oNgifSzHIjwtcEenmHaeSP7am7ewylIa'
  });

  const cosTokenRouter = new Router({ prefix: '/admin/token' });

  const cosPut = (file) => {
    return new Promise((resolve, reject) => {
      cos.putObject({
        Bucket: 'blog-1251573291', /* 必须 */
        Region: 'ap-guangzhou',    /* 必须 */
        Key: file.originalname,              /* 必须 */
        Body: file.buffer, /* 必须 */
    }, function(err, data) {
        resolve(data) || reject(err)
    });
    })
  }
 
  cosTokenRouter.put('/', async (ctx, next) => {
    const result =  await cosPut(ctx.req.files[0])
    ctx.body = result.Location;
  })

  // 转发头像数据
  cosTokenRouter.post('/', async (ctx, next) => {
    // console.log(ctx.req.files[0]);
    ctx.body = 'ok'
  })




  return cosTokenRouter;

}