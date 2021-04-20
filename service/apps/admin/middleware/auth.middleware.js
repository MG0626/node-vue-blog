// 错误信息常量
const errorTypes = require('../../lib/constants/error-types');
// md5加密
const { md5password } = require('../../lib/password-handle');
// 数据库
const service = require('../service/auth.service');
// jwt
const jwt = require('jsonwebtoken');
const { PUBLIC_KEY } = require('../../lib/config');


class AuthMiddleware{
  async verifyLogin(ctx, next){
    let { name, password } = ctx.request.body;
    // 判断是否为空
    if (!name || !password) {
      const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED); // 用户名或密码不能为空
      return ctx.app.emit('error', error, ctx);
    }
    // 密码加密
    password = ctx.request.body.password = md5password(password);
    // 获取数据
    const [result] = await service.getUserName(name);
    // 获取不到数据就抛出错误
    if (!result) {
      const error = new Error(errorTypes.USER_DOES_NOT_EXIST); // 用户名不存在
      return ctx.app.emit('error', error, ctx);
    }
    // 密码比对
    if (result.password !== password) {
      const error = new Error(errorTypes.PASSWORD_MISTAKE); // 密码错误
      return ctx.app.emit('error', error, ctx);
    }
    // 都没有问题就next
    ctx.user = result;
    await next();
  }


  // 验证token
  async verifyAuth (ctx, next){
    // 获取token
    const token = ctx.request.headers.authorization && ctx.request.headers.authorization.replace('Bearer ', "");

    try {
      const result = jwt.verify(token, PUBLIC_KEY, {
        algorithms: ['RS256']
      })
      ctx.user = result;
      await next();
    } catch (error) {
      error.message = error.message.replace(' ', '_');
      console.log(error.message);
      return ctx.app.emit('error', error, ctx);
    }
  }
}


module.exports = new AuthMiddleware();