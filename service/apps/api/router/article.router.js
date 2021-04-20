const { recommend, list, labelArticleList, categoryArticleList, archiveList, detail } = require("../controller/article.controller");


module.exports = (Router) => {
  const articleRouter = new Router({ prefix: '/api/articles' });

  
  articleRouter.get('/recommend', recommend);
  articleRouter.get('/recommend/:label', labelArticleList);
  articleRouter.get('/recommend_category/:id', categoryArticleList);
  articleRouter.get('/release', list);
  articleRouter.get('/archive', archiveList);
  articleRouter.get('/:id/detail', detail);

  return articleRouter;
};
