// 解析.dev文件
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'keys');
const PRIVATE_KEY = fs.readFileSync(`${filePath}/private.key`);
const PUBLIC_KEY = fs.readFileSync(`${filePath}/public.key`);


dotenv.config();

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;