const bcrypt = require('bcryptjs');
const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const Article = require('../model/Article');
const path = require("path");
const CategoryArticle = require('../model/CategoryArticle');
const Course = require('../model/Course');
const CategoryCourse = require('../model/CategoryCourse');
const CourseQuiz = require('../model/CourseQuiz');
const CourseModule = require('../model/CourseModule');
const { Op } = require('sequelize');
const query = require('../model/pool');

const userPostForum = async (req, res) => {
  try {
    const question = req.body.question
    const title = req.body.title
    const category_id = req.body.category_id
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;
    var filePath = '';
    if(req.file && req.file.filename) {
      filePath = path.join("uploads", req.file.filename);
      const sql = `
        INSERT INTO forum (user_id, question, category_id, image, title)
        VALUES (?, ?, ?, ?)
      `;
      var forum = await query(sql, [user_id, question, category_id, filePath, title]);
    } else {
      const sql = `
        INSERT INTO forum (user_id, question, category_id, title)
        VALUES (?, ?, ?, ?)
      `;
      var forum = await query(sql, [user_id, question, category_id, title]);
    }
    

    res.status(200).json(forum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getForums = async (req, res) => {
  try {
    const forums = await query(`
      SELECT f.*, u.name as username, cc.name as category_name, count(fc.id) as comments FROM forum f
      left join users u on u.id = f.user_id
      left join category_courses cc on cc.id = f.category_id
      left join forum_comment fc on fc.forum_id = f.id
      where f.deletedAt is null and u.deletedAt is null and cc.deletedAt is null and fc.deletedAt is null
      group by f.id
    `);

    res.status(200).json(forums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
const getForum = async (req, res) => {
  try {
    const id = req.params.id;

    const forums = await query(`
      SELECT f.*, COALESCE(like_count.likes, 0) AS likes, u.name as username, cc.name as category_name, count(fc.id) as comments FROM forum f
      left join users u on u.id = f.user_id
      left join category_courses cc on cc.id = f.category_id
      left join forum_comment fc on fc.forum_id = f.id
      LEFT JOIN (
        SELECT forum_id, COUNT(*) AS likes
        FROM forum_comment_like
        WHERE comment_id IS NULL AND deletedAt IS NULL
        GROUP BY forum_id
    ) like_count ON like_count.forum_id = f.id
    
      where f.deletedAt is null and f.id = ?
    `, [id]);
    console.log(forums);
    var isLikes = false;
    if (forums.length === 0) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan!' });
    }

    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;
    const forum_like = await query(`
      SELECT * FROM forum_comment_like where user_id = ? and forum_id = ? and comment_id is null and deletedAt is null
      `,
      [user_id, req.params.id]
    );

    if (forum_like.length > 0) {
      isLikes = true;
    }

    const comments = await query(`
    SELECT fc.*, u.name as username, 
    CASE
        WHEN fcl.deletedAt is null and fcl.id is not null THEN 1
        WHEN fcl.deletedAt is not null and fcl.id is not null THEN 0
        ELSE 0
    END as isLike, fcl.id as fcl_id

    FROM forum_comment fc
    left join users u on u.id = fc.user_id
    left join forum_comment_like fcl on fcl.user_id = fc.user_id and fcl.comment_id = fc.id
    where fc.user_id = ? and fc.forum_id = ? and fc.deletedAt is null
    group by fc.id
    `,
      [user_id, req.params.id]
    );
    // const comments = await query(`
    // SELECT ac.*, u.name as username, 
    // CASE
    //     WHEN acl.deletedAt is null and acl.id is not null THEN 1
    //     WHEN acl.deletedAt is not null and acl.id is not null THEN 0
    //     ELSE 0
    // END as isLike, acl.id as acl_id

    // FROM article_comments ac
    // left join users u on u.id = ac.user_id
    // left join article_comment_likes acl on acl.user_id = ac.user_id and acl.comment_id = ac.id
    // where ac.user_id = ? and ac.article_id = ? and ac.deletedAt is null
    // group by ac.id
    // `,
    //   [user_id, req.params.id]
    // );
    
    res.status(200).json({ forum: forums[0], isLikes: isLikes, comments: comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

const likeForum = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;
    const comment_id = req.body.comment_id;
    if (comment_id) {
      const forum_like = await query(`
        SELECT * FROM forum_comment_like where user_id = ? and forum_id = ? and comment_id = ?
        `,
        [user_id, req.params.id, comment_id]
      );

      if (forum_like.length > 0) {
        if (forum_like[0].deletedAt) {
          await query(`
            update forum_comment_like set deletedAt = NULL where user_id = ? and forum_id = ? and comment_id = ?
          `,
            [user_id, req.params.id, comment_id]
          );
          await query(`
            update forum_comment set \`like\` = \`like\` + 1 where user_id = ? and forum_id = ? and id = ?
          `,
            [user_id, req.params.id, comment_id]
          );
        } else {
          await query(`
            update forum_comment_like set deletedAt = NOW() where user_id = ? and forum_id = ? and comment_id = ?
          `,
            [user_id, req.params.id, comment_id]
          );
          await query(`
            update forum_comment set \`like\` = \`like\` - 1 where user_id = ? and forum_id = ? and id = ?
          `,
            [user_id, req.params.id, comment_id]
          );
        }
      } else {
        await query(`
          INSERT INTO forum_comment_like (user_id, comment_id, forum_id) 
          VALUES (?, ?, ?)
        `,
          [user_id, comment_id, req.params.id]
        );
        await query(`
          update forum_comment set \`like\` = 1 where user_id = ? and forum_id = ? and id = ?
        `,
          [user_id, req.params.id, comment_id]
        );
      }

    } else {
      const forum_like = await query(`
        SELECT * FROM forum_comment_like where user_id = ? and forum_id = ? and comment_id is null
        `,
        [user_id, req.params.id]
      );

      if (forum_like.length > 0) {
        if (forum_like[0].deletedAt) {
          await query(`
            update forum_comment_like set deletedAt = NULL where user_id = ? and forum_id = ? and comment_id is null
          `,
            [user_id, req.params.id]
          );
        } else {
          await query(`
            update forum_comment_like set deletedAt = NOW() where user_id = ? and forum_id = ? and comment_id is null
          `,
            [user_id, req.params.id]
          );
        }
      } else {
        await query(`
          INSERT INTO forum_comment_like (user_id, comment_id, forum_id) 
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

const commentForum = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;
    const comment = req.body.comment;
    const commentId = req.body.commentId;
    const forum_id = req.params.id;

    if (commentId) {
      await query(`
        INSERT INTO forum_comment (user_id, comment_id, forum_id, comment) 
        VALUES (?, ?, ?, ?)
      `, [user_id, commentId, forum_id, comment]);
    } else {
      await query(`
        INSERT INTO forum_comment (user_id, comment_id, forum_id, comment) 
        VALUES (?, null, ?, ?)
      `, [user_id, forum_id, comment]);
    }

    res.status(200).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

const getUser = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;

    const user = await query('select * from users where id = ? and deletedAt is null', [user_id]);

    res.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

const postUser = async (req, res) => {
  try {
    let filePath = null;

    if (req.file) {
      filePath = path.join("uploads", req.file.filename);
    }

    const { name, dob, city, email, mobile_no } = req.body;
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;

    const user = await query('SELECT * FROM users WHERE id = ? and deletedAt is null', [user_id]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan!' });
    }

    await query(
      'UPDATE users SET name = ?, dob = ?, city = ?, email = ?, mobile_no = ?, image = ? WHERE id = ? and deletedAt is null',
      [name, dob, city, email, mobile_no, filePath, user_id]
    );

    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = { userPostForum, getForums, getForum, likeForum, commentForum, getUser, postUser };
