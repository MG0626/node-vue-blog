const connection = require('../../lib/database');

class CategoryService{
  async list(){
    const statement = `
      SELECT * FROM category;
    `;
    const [result] = await connection.execute(statement);
    return result;
  }

  async create(name){
    const statement = `
      INSERT INTO category (name) VALUES (?);
    `;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  async updateName(id, name){
    const statement = `UPDATE category SET name = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [name, id]);
    return result;
  }

  async deleteCategory(id){
    const statement = `DELETE FROM category WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
}

module.exports = new CategoryService();