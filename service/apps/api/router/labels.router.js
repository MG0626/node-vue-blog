const { create, list, update, deleteData } = require('../controller/labels.controller');

module.exports = Router => {
  const labelsRouter = new Router({ prefix: '/api/labels' });

  labelsRouter.get('/list', list)
  labelsRouter.post('/create', create);
  labelsRouter.patch('/:id/update', update);
  labelsRouter.delete('/:id/delete', deleteData)

  return labelsRouter;
}