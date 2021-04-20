// 导入数据库操作模块
const service = require('../service/users.service');

class UsersController{
  async create(ctx) {
    // 获取需要的数据
    const { name, password } = ctx.request.body;
    // 数据库处理数据
    const result = await service.create(name, password);
    ctx.body = result;
  }

  // 查询用户列表
  async list(ctx){
    const result = await service.getUserList();
    ctx.body = result;
  }

  async active(ctx){
    ctx.body = ctx.user;
  }

  async deleteUser(ctx){
    const { id } = ctx.params;
    const result = await service.delUser(id);
    ctx.body = result;
  }

  async update(ctx){
    const { id } = ctx.params;
    const { password } = ctx.request.body;
    const result = await service.updatePassword(id, password);
    ctx.body = result;
  }
}

module.exports = new UsersController();