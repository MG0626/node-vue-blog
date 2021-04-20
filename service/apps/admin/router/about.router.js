const { createProject, list, remove, update, create, fetch, count } = require('../controller/about.controller');

// const { verifyAuth } = require('../middleware/auth.middleware');

module.exports = Router => {
  const aboutRouter = new Router({ prefix: '/admin/about' });

  aboutRouter.post('/',  createProject);
  aboutRouter.post('/create',  create);
  aboutRouter.get('/', fetch);
  aboutRouter.get('/project/list', list);
  aboutRouter.delete('/project/:id', remove);
  aboutRouter.patch('/project/:id', update);

  return aboutRouter;
}