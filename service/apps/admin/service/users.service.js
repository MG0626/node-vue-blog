const connection = require('../../lib/database');

class UserService {
  async create(name, password){
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }

  async getUserByName(name){
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  async getUserList(){
    const statement = `SELECT id, name, createAt createTime, updateAt updateTime FROM user;`;
    const [result] = await connection.execute(statement);
    return result;
  }

  async delUser(id){
    const statement = `DELETE FROM user WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async updatePassword(id, newPassword){
    const statement = `UPDATE user SET password = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [newPassword, id]);
    return result;
  }
}

module.exports = new UserService();