// 错误常量
const errorTypes = require('../../lib/constants/error-types');
// md5加密
const { md5password } = require('../../lib/password-handle');
// 数据库模块
const service = require('../service/users.service');

// 检查用户名和密码是否为空
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 判断是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  //查询用户名有没有被注册过
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}

// 加密密码
const handlePassword = async (ctx, next) => {
  const {password} = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
}




module.exports = {
  verifyUser,
  handlePassword
}