const connection = require('../../lib/database');

class LabelsService{
  async create(name){
    const statement =  `INSERT INTO label (name) VALUES (?)`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  async list(){
    const statement = `SELECT id, name FROM label;`;
    const [result] = await connection.execute(statement);
    return result;
  }

  async updateName(id, name){
    const statement = `UPDATE label SET name = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [name, id]);
    return result;
  }

  async deleteLabel(id){
    const statement = `DELETE FROM label WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
}

module.exports = new LabelsService();