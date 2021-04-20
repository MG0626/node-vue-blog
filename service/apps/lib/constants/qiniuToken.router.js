// const qiniu = require('qiniu');

// module.exports = (Router) => {
//   const tokenRouter = new Router({ prefix: '/admin/token' });

//   const accessKey = 'R6V6slioHh4xDjsiGtEP6RVV2vAsPSr6MOT8hlKZ';
//   const secretKey = 'on4z4O7_FhwmE2fUCGKTsZfGi5HSnS75uyEu2A4a';
//   const bucket = 'cmg-blog'; //空间名

//   tokenRouter.get('/', async (ctx) => {
//     let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
//     let options = {
//       scope: bucket,
//       expires: 3600 * 2, //token过期时间2小时
//     };
//     let putPolicy = new qiniu.rs.PutPolicy(options);
//     let uploadToken = putPolicy.uploadToken(mac);

//     if (uploadToken) {
//       ctx.body = uploadToken;
//     } else {
//       ctx.body = 'err';
//     }
//   });

//   return tokenRouter;
// };
