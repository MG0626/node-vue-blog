
const { login } = require('../controller/auth.controller');

// 中间件
const {
  verifyLogin,
  verifyAuth
} = require('../middleware/auth.middleware');

module.exports = Router => {
  const authRouter = new Router({prefix: '/admin/login'});

  authRouter.post('/', verifyLogin, login);
  authRouter.post('/token', verifyAuth, (ctx) => {
    ctx.body = 'token正常~';
  });
  
  

  return authRouter;
}