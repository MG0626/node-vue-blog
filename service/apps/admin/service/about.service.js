const connection = require('../../lib/database');

class AboutService {
  async create(name, desc, icon, address) {
    const statement = `
    INSERT INTO project (name, \`desc\`, icon, address) VALUES (?, ?, ?, ?)
  `;
    const [result] = await connection.execute(statement, [
      name,
      desc,
      icon,
      address
    ]);
    return result;
  }

  async list(){
    const statement = `
      SELECT * FROM project
    `;
    const [ result ] = await connection.execute(statement);
    return result;
  }

  async remove(id){
    const statement = `
      DELETE FROM project WHERE id = ?;
    `;
    const [ result ] = await connection.execute(statement, [id]);
    return result;
  }

  async update(id, data){
    const statement = `
      UPDATE project SET is_show = ? WHERE id = ?;
    `;
    const [ result ] = await connection.execute(statement, [data, id]);
    return result;
  }

  async createData(name, jobs, desc, imgUrl){
    const statement1 = `
      DELETE FROM about;
    `;
    const statement2 = `
      INSERT INTO about (name, jobs, \`desc\`, imgUrl) VALUES (? ,? ,? ,?)
    `;
    await connection.execute(statement1);
    const [ result ] = await connection.execute(statement2, [name, jobs, desc, imgUrl]);
    return result;
  }

  async fetch(){
    const statement = ` SELECT name, jobs, \`desc\`, imgUrl FROM about`;
    const [ result ] = await connection.execute(statement);
    return result;
  }

}

module.exports = new AboutService();
