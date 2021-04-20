const connection = require('../../lib/database');

class CategoryService{
  async list(){
    const statement = `
      SELECT 
        c.id,
        c.name,
        COUNT(a.id) count
      FROM category c
      LEFT JOIN article_category ac ON c.id = ac.category_id
      LEFT JOIN article a ON ac.article_id = a.id
      GROUP BY c.id;
    `;
    const [result] = await connection.execute(statement);
    return result;
  }

}

module.exports = new CategoryService();