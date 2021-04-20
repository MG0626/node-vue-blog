const {
  create,
  associated,
  list,
  modify,
  update,
  deleteArticle,
  updateArticleOther
} = require('../controller/article.controller');

const { verifyAuth } = require('../middleware/auth.middleware');

module.exports = (Router) => {
  const articleRouter = new Router({ prefix: '/admin/articles' });

  articleRouter.post('/create', verifyAuth, create);
  articleRouter.post('/associated', verifyAuth, associated);
  articleRouter.get('/list', verifyAuth, list);
  articleRouter.get('/:id/modify', verifyAuth, modify);
  articleRouter.patch('/:id/update', verifyAuth, update);
  articleRouter.patch('/:id/other', verifyAuth, updateArticleOther)
  articleRouter.delete('/:id/delete', verifyAuth, deleteArticle);

  return articleRouter;
};
