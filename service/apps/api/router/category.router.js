const { create, list, update, deleteData } = require("../controller/category.controller");

module.exports = Router => {

  const categoryRouter = new Router({ prefix: '/api/category' });

  categoryRouter.get('/list', list)

  return categoryRouter;
}