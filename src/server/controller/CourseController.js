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

const list = async (req, res) => {
  try {
    const sql = `
      SELECT c.*, cc.name AS category_name
      FROM courses c
      LEFT JOIN category_courses cc ON c.category_id = cc.id
      where c.deletedAt is null and cc.deletedAt is null;
    `;
    const categories = await query(sql);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const add = async (req, res) => {
  try {
    const filePath = path.join("uploads", req.files.image[0].filename);
    const { title, description, category_id } = req.body;
    const sql = `
      INSERT INTO courses (name, description, image, category_id)
      VALUES (?, ?, ?, ?);
    `;
    const result = await query(sql, [name, description, filePath, category_id]);

    res.status(201).json({ message: 'Kursus berhasil disimpan!', newCourse: { id: result.insertId, title, description, category_id, image: filePath } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEdit = async (req, res) => {
  try {
    const sqlCourse = `SELECT courses.*, cc.name AS category_name FROM courses LEFT JOIN category_courses cc ON courses.category_id = cc.id WHERE courses.id = ? and courses.deletedAt is null and cc.deletedAt is null`;
    const sqlCategory = `SELECT * FROM category_courses WHERE id = (SELECT category_id FROM courses WHERE id = ? and deletedAt is null) and deletedAt is null`;
    const sqlQuizzes = `SELECT * FROM course_quizzes WHERE course_id = ? and deletedAt is null`;
    const sqlModules = `SELECT * FROM course_modules WHERE course_id = ? and deletedAt is null`;

    const token = req.header('Authorization');
    var isStartedCourses = null;
    var user = null;
    if(token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user_id = decoded.userId;
      const sqlIsStartedCourses = `SELECT * FROM course_users WHERE course_id = ? and user_id = ? and deletedAt is null LIMIT 1`;
      isStartedCourses = await query(sqlIsStartedCourses, [req.params.id, user_id]);

      const usersSql = `SELECT * FROM users where id = ?`
      user = await query(usersSql, [user_id]);
    }

    const [course] = await query(sqlCourse, [req.params.id]);
    const category = await query(sqlCategory, [req.params.id]);
    const quizzes = await query(sqlQuizzes, [req.params.id]);
    const modules = await query(sqlModules, [req.params.id]);


    if (!course) {
      return res.status(404).json({ message: 'Kursus tidak ditemukan!' });
    }

    res.status(200).json({ ...course, category, quizzes, modules, isStartedCourses, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getModuleEdit = async (req, res) => {
  try {
    const selectedModuleQuery = `SELECT course_modules.*, courses.id as course_id, courses.name as course_name, category_courses.name as category_name, (SELECT a.id from course_modules a where a.course_id = course_modules.course_id and a.id > course_modules.id and course_modules.deletedAt is null and a.deletedAt is null order by id asc LIMIT 1 ) as next_course_id, ROW_NUMBER() OVER (ORDER BY id ASC) - 1 AS steps FROM course_modules 
    left join courses on courses.id = course_modules.course_id
    left join category_courses on courses.category_id = category_courses.id
    WHERE course_modules.deletedAt is null and courses.deletedAt is null and category_courses.deletedAt is null and course_modules.id = ${req.params.id}
    order by course_modules.id asc;`;
    const selectedModule = await query(selectedModuleQuery);
    const sqlModule = `SELECT course_modules.*, courses.id as course_id, courses.name as course_name, category_courses.name as category_name, (SELECT a.id from course_modules a where a.course_id = course_modules.course_id and a.id > course_modules.id and course_modules.deletedAt is null and a.deletedAt is null order by id asc LIMIT 1 ) as next_course_id, ROW_NUMBER() OVER (ORDER BY id ASC) - 1 AS steps FROM course_modules 
    left join courses on courses.id = course_modules.course_id
    left join category_courses on courses.category_id = category_courses.id
    WHERE course_modules.deletedAt is null and courses.deletedAt is null and category_courses.deletedAt is null and course_id = ${selectedModule[0].course_id}
    order by course_modules.id asc;`;
    const modules = await query(sqlModule);

    if (!modules) {
      return res.status(404).json({ message: 'Modul tidak ditemukan!' });
    }
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;
    const sqlCourseUser = `SELECT * from course_users where user_id = ? and course_id = ? and deletedAt is null`;
    const courseUser = await query(sqlCourseUser, [user_id, modules[0].course_id]);
    console.log(modules)
    const module = modules.find(row => row.id == req.params.id);
    console.log(module)
    console.log(courseUser)
    if(courseUser[0].step == module.steps) {
      await query(`UPDATE course_users
      SET step = ?
      where user_id = ? and course_id = ?;`, [module.steps + 1, user_id, module.course_id]);
    }



    res.status(200).json({ module, courseUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postEdit = async (req, res) => {
  let { quizzes, modules, name, description, category_id, summary } = req.body;
  quizzes = JSON.parse(quizzes);
  modules = JSON.parse(modules);

  try {
    if (req.files && req.files.image) {
      const filePath = path.join("uploads", req.files.image[0].filename);
      req.body.image = filePath;
      const sqlUpdateCourse = `
        UPDATE courses
        SET name = ?, description = ?, category_id = ?, image = ?, summary = ?
        WHERE id = ?;
      `;
      await query(sqlUpdateCourse, [name, description, category_id, req.body.image, summary, req.params.id]);
    } else {
      const sqlUpdateCourse = `
        UPDATE courses
        SET name = ?, description = ?, category_id = ?, summary = ?
        WHERE id = ?;
      `;
      await query(sqlUpdateCourse, [name, description, category_id, summary, req.params.id]);
    }

    const moduleIds = modules.map((mod) => mod.id).filter(Boolean);
    const placeholders = moduleIds.map(() => '?').join(',');
    const sqlDeleteUnusedModules = `
      update course_modules set deletedAt = NOW()
      WHERE course_id = ? AND id NOT IN (${placeholders});
    `;
    if (moduleIds.length > 0) {
      await query(sqlDeleteUnusedModules, [req.params.id, ...moduleIds]);
    }
    // Handle modules
    for (const mod of modules) {
      if (mod.id) {
        const sqlUpdateModule = `
          UPDATE course_modules
          SET title = ?, description = ?
          WHERE id = ?;
        `;
        await query(sqlUpdateModule, [mod.title, mod.description, mod.id]);
      } else {
        const sqlInsertModule = `
          INSERT INTO course_modules (title, description, course_id)
          VALUES (?, ?, ?);
        `;
        await query(sqlInsertModule, [mod.title, mod.description, req.params.id]);
      }
    }

    const quizIds = quizzes.map((quiz) => quiz.id).filter(Boolean);
    const placeholdersQuizIds = quizIds.map(() => '?').join(',');
    const sqlDeleteUnusedQuizzes = `
      update course_quizzes set deletedAt = NOW()
      WHERE course_id = ? AND id NOT IN (${placeholdersQuizIds});
    `;

    if (quizIds.length > 0) {
      await query(sqlDeleteUnusedQuizzes, [req.params.id, ...quizIds]);
    }
    // Handle quizzes
    for (const quiz of quizzes) {
      if (quiz.id) {
        const sqlUpdateQuiz = `
          UPDATE course_quizzes
          SET question = ?, choices = ?, answer = ?
          WHERE id = ?;
        `;
        await query(sqlUpdateQuiz, [quiz.question, quiz.choices, quiz.answer, quiz.id]);
      } else {
        const sqlInsertQuiz = `
          INSERT INTO course_quizzes (question, choices, answer, course_id)
          VALUES (?, ?, ?, ?);
        `;
        await query(sqlInsertQuiz, [quiz.question, quiz.choices, quiz.answer, req.params.id]);
      }
    }

    res.status(201).json({ message: 'Kursus berhasil disimpan!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postDelete = async (req, res) => {
  try {
    const sqlCheck = `SELECT * FROM courses WHERE id = ? and deletedAt is null`;
    const [course] = await query(sqlCheck, [req.params.id]);

    if (!course) {
      return res.status(404).json({ message: 'Kursus tidak ditemukan!' });
    }

    const sqlDeleteCourse = `UPDATE courses
    SET deletedAt = NOW()
    WHERE id = ?`;
    await query(sqlDeleteCourse, [req.params.id]);

    res.status(201).json({ message: 'Kursus berhasil dihapus!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userStartCourse = async (req, res) => {
  try {
    const sqlCheck = `SELECT * FROM courses WHERE id = ? and deletedAt is null`;
    const [course] = await query(sqlCheck, [req.params.id]);

    if (!course) {
      return res.status(404).json({ message: 'Kursus tidak ditemukan!' });
    }
    
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;

    const sqlStartCourse = `
      INSERT INTO course_users (user_id, course_id, step)
      VALUES (?, ?, 0);
    `;
    await query(sqlStartCourse, [user_id, req.params.id]);

    res.status(201).json({ message: 'Kursus berhasil dimulai!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 

const userCompleteRangkuman = async(req, res) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;
    const sqlModules = `SELECT * from course_modules where  course_id = ? and deletedAt is null`
    const sqlCourseUser = `SELECT * from course_users where user_id = ? and course_id = ? and deletedAt is null`;
    const courseUser = await query(sqlCourseUser, [user_id, req.params.id]);
    const modules = await query(sqlModules, [req.params.id]);
    
    if(modules.length == courseUser[0].step) {
      await query(`UPDATE course_users
      SET step = ?
      where user_id = ? and course_id = ?;`, [courseUser[0].step + 1, user_id, req.params.id]);
    }

    res.status(201).json({ message: 'Kursus berhasil dimulai!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const userCompleteQuiz = async (req, res) => {
  try {
    console.log('sdfdsf');
    const course_id = req.params.id;
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;
    const answers = req.body.answer;

    const quizzes = await query(`select * from course_quizzes where course_id = ? and deletedAt is null`, [course_id]);
    console.log(req.body);
    var score = 0;
    quizzes.forEach(async (value, index) => {
      var answer = answers[index];
      if(answer == value.answer) {
        score += 10;
        await query(`
          INSERT INTO course_quiz_users (user_id, quiz_id, course_id, answer, correct)
          VALUES (?, ?, ?, ?, 1);
        `, [user_id, value.id, course_id, answer])
      } else {
        await query(`
          INSERT INTO course_quiz_users (user_id, quiz_id, course_id, answer, correct)
          VALUES (?, ?, ?, ?, 0);
        `, [user_id, value.id, course_id, answer])
      }
    })
    await query(`UPDATE course_users
    SET score = ?, step = step + 1
    where user_id = ? and course_id = ?;`, [score, user_id, req.params.id]);

    res.status(201).json({ message: 'Kursus berhasil dimulai!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const userQuizResult = async (req, res) => {
  try {
    const course_id = req.params.id;
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;

    const quizzes = await query(`select * from course_quiz_users where course_id = ? and user_id = ? and deletedAt is null`, [course_id, user_id]);

    res.status(201).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const userCourses = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.userId;
    
    const courses = await query(`select c.id as id, c.image, c.name, c.description, cc.name as category_name from course_users cu
    left join courses c on c.id = cu.course_id
    left join category_courses cc on cc.id = c.category_id
    where cu.user_id = ? and cu.deletedAt is null and c.deletedAt is null and cc.deletedAt is null`, [user_id]);

    res.status(201).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = { list, add, getEdit, postEdit, postDelete, getModuleEdit, userStartCourse, userCompleteRangkuman, userCompleteQuiz, userQuizResult, userCourses };
