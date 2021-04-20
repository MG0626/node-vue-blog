const errorTypes = require('./constants/error-types');

function errorHandle(error, ctx){
  let status, message;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或密码不能为空!";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409;
      message = "用户名已存在!";
      break;
    case errorTypes.USER_DOES_NOT_EXIST:
      status = 400;
      message = "用户名不存在！"
      break;
    case errorTypes.PASSWORD_MISTAKE:
      status = 400;
      message = "密码错误！"
      break;
    case errorTypes.INVALID_TOKEN:
      status = 401;
      message = "无效的token~"
      break;
    case errorTypes.JWT_EXPIRED:
      status = 401;
      message = "token已过期~"
      break;
    case errorTypes.IDENTITY_INCONSISTENCY:
      status = 401;
      message = "没有权限~";
      break;
    default:
      status = 404;
      message = "NOT FOUND!";
      break;
  }

  ctx.status = status;
  ctx.body = message;
}


module.exports = {
  errorHandle
}