const connection = require('../../lib/database');


class ArticleService {

  async create(title, desc, content ) {
    const statement = `INSERT INTO article (title, art_desc, content) VALUES (?, ?, ?);`;
    const [result] = await connection.execute(statement, [title, desc, content]);
    return result;
  }

  async associated(id, labels, category) {
    const statement = `INSERT INTO article_label (article_id, label_id) VALUES (?, ?);`;
    const statement2 = `INSERT INTO article_other (article_id) VALUES (?);`;
    const statement3 = `INSERT INTO article_category (category_id, article_id) VALUES (?, ?);`;
    try {
      await connection.execute(statement2, [id]);
      await connection.execute(statement3, [category.id, id]);
      labels.forEach(async lable => {
        await connection.execute(statement, [id, lable.id]);
      });
      return "ok";
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async list() {
    const statement = `
      SELECT  a.id,
              a.title,
              a.art_desc,
              a.content,
              a.createAt createTime,
              a.updateAt updateTime,
              ao.is_recommend,
              ao.is_release,
              JSON_ARRAYAGG(
              JSON_OBJECT("id", l.id, "name", l.name)
              ) labels,
              JSON_ARRAYAGG(
                JSON_OBJECT("id", c.id, "name", c.name)
                ) category	
      FROM article a  
      LEFT JOIN article_label al ON a.id = al.article_id 
      LEFT JOIN label l  ON l.id = al.label_id 
      LEFT JOIN article_other ao  ON ao.article_id = a.id
      LEFT JOIN article_category ac ON a.id = ac.article_id
      LEFT JOIN category c ON c.id = ac.category_id 
      GROUP BY a.id;
    `;
    const [result] = await connection.execute(statement);
    return result;
  }

  async modify(id) {
    const statement = `
    SELECT  a.id,
        a.title,
				a.art_desc,
        a.content,
        a.createAt createTime,
        a.updateAt updateTime,
        JSON_ARRAYAGG(
        JSON_OBJECT("id", l.id, "name", l.name)
        ) labels,
        JSON_ARRAYAGG(
        JSON_OBJECT("id", c.id, "name", c.name)
        ) category
    FROM article a  
    LEFT JOIN article_label al ON a.id = al.article_id 
    LEFT JOIN label l  ON l.id = al.label_id
    LEFT JOIN article_category ac ON a.id = ac.article_id
    LEFT JOIN category c ON c.id = ac.category_id 
    GROUP BY a.id HAVING a.id = ?;
    `;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async update(id, title, content, labels, category) {
    const statement1 = `UPDATE article SET title = ?, content = ? WHERE id = ?;`;
    const statement2 = `DELETE FROM article_label WHERE article_id = ?;`;
    const statement3 = `INSERT INTO article_label (article_id, label_id) VALUES (?, ?)`;
    const statement4 = `DELETE FROM article_category WHERE article_id = ?;`;
    const statement5 = `INSERT INTO article_category (category_id, article_id) VALUES (?, ?)`;
    

    try {
      await connection.execute(statement1, [title, content, id]);
      await connection.execute(statement4, [id]);
      await connection.execute(statement5, [category.id, id]);
      labels[0].id && labels.forEach(async label => {
        await connection.execute(statement2, [id]);
        await connection.execute(statement3, [id, label.id]);
      })

      return "修改成功~"
    } catch (error) {
      return "修改失败~"
    }
  }

  async delete(id){
    const statement = `DELETE FROM article WHERE id = ?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async modifyOther(id, key, value){
    const statement = `
      UPDATE article_other SET is_${key} = ? WHERE article_id = ?; 
    `;
    const [result] = await connection.execute(statement, [value, id]);
    return result;
  }
}

module.exports = new ArticleService();