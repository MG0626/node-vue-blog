const { create, list, update, deleteData } = require('../controller/labels.controller');

const { verifyAuth } = require('../middleware/auth.middleware');

module.exports = Router => {
  const labelsRouter = new Router({ prefix: '/admin/labels' });

  labelsRouter.get('/list', verifyAuth, list)
  labelsRouter.post('/create', verifyAuth, create);
  labelsRouter.patch('/:id/update', verifyAuth, update);
  labelsRouter.delete('/:id/delete', verifyAuth, deleteData)

  return labelsRouter;
}