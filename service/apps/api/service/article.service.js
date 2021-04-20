const connection = require('../../lib/database');

class ArticleService{
  async recommendList(){
    const statement = `
      SELECT 
        a.id,
        a.title,
        a.art_desc,
        a.content,
        a.createAt createTime,
        a.updateAt updateTime,
        ao.is_recommend,
        ao.is_release
      FROM article a
      LEFT JOIN article_other ao ON a.id = ao.article_id 
      GROUP BY a.id 
      HAVING ao.is_recommend = 1 AND ao.is_release = 1; 
    `;
    const [resutl] = await connection.execute(statement);
    return resutl;
  }

  async releaseList(){
    const statement = `
      SELECT 
        a.id,
        a.title,
        a.art_desc,
        a.content,
        a.createAt createTime,
        a.updateAt updateTime,
        ao.is_recommend,
        ao.is_release,
        JSON_ARRAYAGG(
          JSON_OBJECT("id", l.id, "name", l.name)
        ) labels
      FROM article a
      LEFT JOIN article_other ao ON a.id = ao.article_id
      LEFT JOIN article_label al ON a.id = al.article_id
      LEFT JOIN label l ON l.id = al.label_id
      GROUP BY a.id 
      HAVING ao.is_release = 1 
      ORDER BY a.updateAt DESC;
    `;
    const [result] = await connection.execute(statement);
    return result;
  }

  async articleList(name){
    const statement = `
      SELECT 
        a.id,
        a.title,
        a.art_desc,
        a.content,
        a.createAt createTime,
        a.updateAt updateTime,
        l.id label_id,
        l.name label_name
      FROM article a
      LEFT JOIN article_other ao ON a.id = ao.article_id
      LEFT JOIN article_label al ON a.id = al.article_id
      LEFT JOIN label l ON l.id = al.label_id
      WHERE l.name = ? AND ao.is_release = 1;
    `;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }

  async categoryArticleList(id){
    const statement = `
      SELECT 
        a.id,
        a.title,
        a.art_desc,
        a.content,
        a.createAt createTime,
        a.updateAt updateTime,
        c.id category_id,
        c.name category_name
      FROM article a
      LEFT JOIN article_other ao ON a.id = ao.article_id
      LEFT JOIN article_category ac ON a.id = ac.article_id
      LEFT JOIN category c ON c.id = ac.category_id
      WHERE c.id = ? AND ao.is_release = 1;
    `;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async archiveData(){
    const statement = `
    SELECT
      a.createTime,
      COUNT(a.articles) articleCount,
      JSON_ARRAYAGG(a.articles) articleList
    FROM (
      SELECT 
        (select DATE_FORMAT(a.createAt,"%Y-%m-%d")) createTime,
        JSON_OBJECT(
              "id", a.id, 
              "title", a.title, 
              "desc", a.art_desc,
              "content", a.content,
              "createTime", a.createAt,
              "updateTime", a.updateAt,
              "labels", JSON_ARRAYAGG(
                          JSON_OBJECT("id", l.id, "name", l.name)
                        )
          ) articles
        FROM article a
        LEFT JOIN article_other ao ON a.id = ao.article_id
        LEFT JOIN article_label al ON a.id = al.article_id
        LEFT JOIN label l ON l.id = al.label_id
        WHERE ao.is_release = 1
        GROUP BY a.id
        ORDER BY (select DATE_FORMAT(a.createAt,"%Y-%m-%d")) DESC
    ) a
    GROUP BY a.createTime
    ORDER BY a.createTime DESC
    `;

    const [result] = await connection.execute(statement);
    return result;
  }

  async detail(id){
    const satement = `
      SELECT  
        a.id,
        a.title,
        a.art_desc,
        a.content,
        (select DATE_FORMAT(a.createAt,"%Y-%m-%d %H:%m:%s")) createTime,
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
      LEFT JOIN article_other ao  ON ao.article_id = a.id
      LEFT JOIN article_category ac ON a.id = ac.article_id
      LEFT JOIN category c ON c.id = ac.category_id 
      GROUP BY a.id
      HAVING a.id = ?;
    `;
    const [ result ] = await connection.execute(satement, [id]);
    // 删除重复数据
    result[0].category = result[0].category[0];
    return result;
  }
}

module.exports = new ArticleService();