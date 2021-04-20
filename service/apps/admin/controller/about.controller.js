const service = require('../service/about.service');

class AboutController{
  async createProject(ctx) {
    const { name, desc, icon, address } = ctx.request.body;
    const result = await service.create(name, desc, icon, address);
    console.log(result);
    ctx.body = result;
  }

  async list(ctx){
    const result = await service.list();
    ctx.body = result;
  }

  async remove(ctx) {
    const { id } = ctx.params;
    const result = await service.remove(id);
    ctx.body = result;
  }

  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body;
    const result = await service.update(id, data);
    ctx.body = result;
  }

  async create(ctx){
    const { name, jobs, desc, imgUrl} = ctx.request.body;
    const result = service.createData(name, jobs, desc, imgUrl);
    ctx.body = result;
  }

  async fetch(ctx){
    const result = await service.fetch();
    ctx.body = result;
  }

}

module.exports = new AboutController();