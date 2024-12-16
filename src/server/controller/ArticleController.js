const bcrypt = require('bcryptjs');
const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const Article = require('../model/Article');
const path = require("path");
const CategoryArticle = require('../model/CategoryArticle');
const query = require('../model/pool');

const list = async (req, res) => {
  try {
    const categories = await query(`
      SELECT 
        a.*, 
        c.name AS category_name 
      FROM 
        articles a
      LEFT JOIN 
        category_articles c 
      ON 
        a.category_id = c.id
      WHERE a.deletedAt IS NULL and c.deletedAt IS NULL
    `);
    console.log(categories);
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const add = async (req, res) => {
  try {
    const filePath = path.join("uploads", req.file.filename);
    const { title, description, category_id, source } = req.body;

    const result = await query(
      `INSERT INTO articles (title, description, category_id, image, source) 
       VALUES (?, ?, ?, ?, ?)`,
      [title, description, category_id, filePath, source]
    );

    res.status(201).json({ message: 'Article berhasil disimpan!', item: { id: result.insertId, ...req.body, image: filePath } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getEdit = async (req, res) => {
  try {
    const rows = await query(
      `SELECT a.*, ca.name as category_name, count(acl.id) as likes FROM articles a 
      left join category_articles ca on ca.id = a.category_id
      left join article_comment_likes acl on acl.article_id = a.id and acl.comment_id is null and acl.deletedAt is null
      WHERE a.id = ? and a.deletedAt is null`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan!' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getArticle = async (req, res) => {
  try {
    const rows = await query(
      `SELECT a.*, ca.name as category_name, count(acl.id) as likes FROM articles a 
      left join category_articles ca on ca.id = a.category_id
      left join article_comment_likes acl on acl.article_id = a.id and acl.comment_id is null and acl.deletedAt is null
      WHERE a.id = ? and a.deletedAt is null`,
      [req.params.id]
    );
    var isLikes = false;
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan!' });
    }

    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;
    const article_like = await query(`
      SELECT * FROM article_comment_likes where user_id = ? and article_id = ? and comment_id is null and deletedAt is null
      `,
      [user_id, req.params.id]
    );

    if (article_like.length > 0) {
      isLikes = true;
    }

    const comments = await query(`
    SELECT ac.*, u.name as username, 
    CASE
        WHEN acl.deletedAt is null and acl.id is not null THEN 1
        WHEN acl.deletedAt is not null and acl.id is not null THEN 0
        ELSE 0
    END as isLike, acl.id as acl_id

    FROM article_comments ac
    left join users u on u.id = ac.user_id
    left join article_comment_likes acl on acl.user_id = ac.user_id and acl.comment_id = ac.id
    where ac.user_id = ? and ac.article_id = ? and ac.deletedAt is null
    group by ac.id
    `,
      [user_id, req.params.id]
    );
    
    res.status(200).json({ article: rows[0], isLikes: isLikes, comments: comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const likeArticle = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;
    const comment_id = req.body.comment_id;
    if (comment_id) {
      const article_like = await query(`
        SELECT * FROM article_comment_likes where user_id = ? and article_id = ? and comment_id = ?
        `,
        [user_id, req.params.id, comment_id]
      );

      if (article_like.length > 0) {
        if (article_like[0].deletedAt) {
          await query(`
            update article_comment_likes set deletedAt = NULL where user_id = ? and article_id = ? and comment_id = ?
          `,
            [user_id, req.params.id, comment_id]
          );
          await query(`
            update article_comments set \`like\` = \`like\` + 1 where user_id = ? and article_id = ? and id = ?
          `,
            [user_id, req.params.id, comment_id]
          );
        } else {
          await query(`
            update article_comment_likes set deletedAt = NOW() where user_id = ? and article_id = ? and comment_id = ?
          `,
            [user_id, req.params.id, comment_id]
          );
          await query(`
            update article_comments set \`like\` = \`like\` - 1 where user_id = ? and article_id = ? and id = ?
          `,
            [user_id, req.params.id, comment_id]
          );
        }
      } else {
        await query(`
          INSERT INTO article_comment_likes (user_id, comment_id, article_id) 
          VALUES (?, ?, ?)
        `,
          [user_id, comment_id, req.params.id]
        );
        await query(`
          update article_comments set \`like\` = 1 where user_id = ? and article_id = ? and id = ?
        `,
          [user_id, req.params.id, comment_id]
        );
      }

    } else {
      const article_like = await query(`
        SELECT * FROM article_comment_likes where user_id = ? and article_id = ? and comment_id is null
        `,
        [user_id, req.params.id]
      );

      if (article_like.length > 0) {
        if (article_like[0].deletedAt) {
          await query(`
            update article_comment_likes set deletedAt = NULL where user_id = ? and article_id = ? and comment_id is null
          `,
            [user_id, req.params.id]
          );
        } else {
          await query(`
            update article_comment_likes set deletedAt = NOW() where user_id = ? and article_id = ? and comment_id is null
          `,
            [user_id, req.params.id]
          );
        }
      } else {
        await query(`
          INSERT INTO article_comment_likes (user_id, comment_id, article_id) 
          VALUES (?, null, ?)
        `,
          [user_id, req.params.id]
        );
      }

    }

    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const commentArticle = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;
    const comment = req.body.comment;
    const commentId = req.body.commentId;
    const article_id = req.params.id;

    if (commentId) {
      await query(`
        INSERT INTO article_comments (user_id, comment_id, article_id, comment) 
        VALUES (?, ?, ?, ?)
      `, [user_id, commentId, article_id, comment]);
    } else {
      await query(`
        INSERT INTO article_comments (user_id, comment_id, article_id, comment) 
        VALUES (?, null, ?, ?)
      `, [user_id, article_id, comment]);
    }

    res.status(200).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

const postEdit = async (req, res) => {
  try {
    let filePath = null;

    if (req.file) {
      filePath = path.join("uploads", req.file.filename);
    }

    const { title, description, category_id, source } = req.body;

    const result = await query(
      `UPDATE articles 
       SET title = ?, description = ?, category_id = ?, image = COALESCE(?, image), source = ? 
       WHERE id = ?`,
      [title, description, category_id, filePath, source, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan!' });
    }

    res.status(200).json({ message: 'Artikel berhasil disimpan!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const postDelete = async (req, res) => {
  try {
    const result = await query(
      `UPDATE articles
      SET deletedAt = NOW()
      WHERE id = ?;`,
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan!' });
    }

    res.status(200).json({ message: 'Artikel berhasil dihapus!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const popularArticle = async (req, res) => {
  try {
    const articles = await query(
      `
      SELECT a.*, count(acl.id) as likes, ca.name as category_name FROM articles a 
      left join article_comment_likes acl on acl.article_id = a.id and acl.comment_id is null and acl.deletedAt is null
      left join category_articles ca on ca.id = a.category_id 
      where a.deletedAt is null
      group by a.id 
      `
    )
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { list, add, getEdit, postEdit, postDelete, popularArticle, getArticle, likeArticle, commentArticle };
