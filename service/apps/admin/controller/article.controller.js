const service = require('../service/article.service');

class ArticleController{
  async create(ctx){
    const { title, desc, content } = ctx.request.body;
    const result = await service.create(title, desc, content);
    ctx.body = result;
  }

  async associated(ctx){
    const { id, labels, category} = ctx.request.body;
    const result = await service.associated(id, labels, category);
    ctx.body = result;
  }

  async list(ctx){
    const result = await service.list();
    ctx.body = result;
  }

  async modify(ctx){
    const { id } = ctx.params;
    const result = await service.modify(id);
    ctx.body = result;
  }

  async update(ctx){
    const { id } = ctx.params;
    const {title, content, labels, category} = ctx.request.body;
    const result = await service.update(id, title, content, labels, category);
    ctx.body = result;
  }

  async deleteArticle(ctx){
    const { id } = ctx.params;
    const result = await service.delete(id);
    ctx.body = result;
  }

  async updateArticleOther(ctx){
    const { id } = ctx.params;
    const { key, value } = ctx.request.body;
    const result = await service.modifyOther(id, key, value);
    ctx.body = result;
  }
}

module.exports = new ArticleController();