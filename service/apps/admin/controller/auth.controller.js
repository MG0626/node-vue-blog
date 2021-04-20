const jwt = require('jsonwebtoken');

const { PRIVATE_KEY } = require('../../lib/config');

class AuthController{
  async login (ctx) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 有效时间，秒
      algorithm: 'RS256' 
    })

    ctx.body = {
      id,
      name,
      token
    }

  }
}

module.exports = new AuthController();