const connection = require('../../lib/database');

class AboutService {
  async count(){
    const statement = `
      SELECT 
        COUNT(id) articleCount,
        (SELECT COUNT(id) FROM label) labelCount,
        (SELECT COUNT(id) FROM category) categoryCount
      FROM article
    `;
    const [ result ] = await connection.execute(statement);
    return result;
  }

  async fetch(){
    const statement = `
      SELECT 
        name,
        \`desc\`,
        jobs,
        imgUrl,
        (
          SELECT 
            JSON_ARRAYAGG(
              JSON_OBJECT('id', id, 'name', name, 'desc', \`desc\`, 'icon', icon, 'address', address)
            )
          FROM project WHERE is_show = 1
        ) projects
      FROM about
    `;
    const [ result ] = await connection.execute(statement);
    return result;
  }
}

module.exports = new AboutService();
