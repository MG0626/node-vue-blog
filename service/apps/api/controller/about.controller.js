const service = require('../service/about.service');

class AboutController{
  async count(ctx){
    const result = await service.count();
    ctx.body = result;
  }

  async fetch(ctx){
    const result = await service.fetch();
    ctx.body = result[0];
  }

}

module.exports = new AboutController();