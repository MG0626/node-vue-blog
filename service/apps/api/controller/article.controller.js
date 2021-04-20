const service = require('../service/article.service');

class ArticleController{

  async recommend(ctx){
    const result = await service.recommendList();
    ctx.body = result;
  }

  async list(ctx){
    const result = await service.releaseList();
    ctx.body = result;
  }

  async labelArticleList(ctx){
    const name = ctx.params.label;
    const result = await service.articleList(name);
    ctx.body = result;
  }

  async categoryArticleList(ctx){
    const id = ctx.params.id;
    console.log(id);
    const result = await service.categoryArticleList(id);
    console.log(result);
    ctx.body = result;
  }

  async archiveList(ctx){
    const result = await service.archiveData();
    ctx.body = result;
  }

  async detail(ctx){
    const { id } = ctx.params;
    const result = await service.detail(id);
    ctx.body = result;
  }
}

module.exports = new ArticleController();