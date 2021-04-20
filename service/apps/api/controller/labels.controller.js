const service = require('../service/labels.service');


class LabelsController{
  async create(ctx){
    const { name } = ctx.request.body;
    const result = await service.create(name);
    ctx.body = result;
  }

  async list(ctx){
    const result = await service.list();
    ctx.body = result;
  }

  async update(ctx){
    const { id } = ctx.params;
    const { name } = ctx.request.body;
    const result = await service.updateName(id, name);
    ctx.body = result;
  }

  async deleteData(ctx){
    const { id } = ctx.params;
    const result = await service.deleteLabel(id);
    ctx.body = result;
  }
}

module.exports = new LabelsController();