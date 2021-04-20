// 数据库
const connection = require('../../lib/database');

const { create, list, active, deleteUser, update } = require('../controller/users.controller');
// 中间件
const {
  verifyUser,
  handlePassword
} = require('../middleware/users.middleware');

const { verifyAuth } = require('../middleware/auth.middleware');

module.exports = Router => {
  const usersRouter = new Router({prefix: '/admin/users'});

  usersRouter.post('/', verifyUser, handlePassword, create);
  
  // 查询用户列表
  usersRouter.get('/list', verifyAuth, list);
  usersRouter.get('/active', verifyAuth, active);
  usersRouter.del('/:id/delete', verifyAuth, deleteUser);
  usersRouter.patch('/:id/update', verifyAuth, handlePassword, update)

  return usersRouter;
}