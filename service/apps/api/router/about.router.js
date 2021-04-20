const { count, fetch } = require('../controller/about.controller');

// const { verifyAuth } = require('../middleware/auth.middleware');

module.exports = Router => {
  const aboutRouter = new Router({ prefix: '/api/about' });

  aboutRouter.get('/count', count);
  aboutRouter.get('/', fetch);

  return aboutRouter;
}