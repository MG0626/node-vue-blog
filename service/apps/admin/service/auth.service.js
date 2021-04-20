// 数据库
const connection = require('../../lib/database');


class AuthService{

  async getUserName(name){
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const [result] = await connection.execute(statement, [name])
    return result;
  }

}

module.exports = new AuthService();