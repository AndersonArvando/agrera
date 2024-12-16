const { Sequelize, DataTypes } = require('sequelize');
const CategoryCourse = require('./CategoryCourse');
const CourseQuiz = require('./CourseQuiz');
const CourseModule = require('./CourseModule');
const sequelize = new Sequelize('stupen', 'root', 'qwe123', {
  host: 'localhost',
  dialect: 'mysql'
});

const Course = sequelize.define("course", {
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  canva_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  youtube_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  certificate: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true
  },
}, {
  sequelize,
  paranoid: true,
});
Course.belongsTo(CategoryCourse, { foreignKey: 'category_id', as: 'category', onDelete: 'CASCADE' });
Course.hasMany(CourseQuiz, { foreignKey: 'course_id', as: 'quizzes', onDelete: 'CASCADE' });
Course.hasMany(CourseModule, { foreignKey: 'course_id', as: 'modules', onDelete: 'CASCADE' });

(async () => {
  await sequelize.sync();
  // Code here
})();

module.exports = Course;

// const User = sequelize.define('user', {
// });


// // `sequelize.define` also returns the model
// console.log('test' + User === sequelize.models.User); // true

