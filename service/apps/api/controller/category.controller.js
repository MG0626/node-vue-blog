const service = require('../service/category.service');
class CategoryController{
  async list(ctx){
    const result = await service.list();
    ctx.body = result;
  }

  
}


module.exports = new CategoryController();