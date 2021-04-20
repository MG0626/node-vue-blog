const { create, list, update, deleteData } = require("../controller/category.controller");

const { verifyAuth } = require('../middleware/auth.middleware');

module.exports = Router => {

  const categoryRouter = new Router({ prefix: '/admin/category' });

  categoryRouter.get('/list', verifyAuth, list)
  categoryRouter.post('/create', verifyAuth, create)
  categoryRouter.patch('/:id/update', verifyAuth, update);
  categoryRouter.delete('/:id/delete', verifyAuth, deleteData)

  return categoryRouter;
}