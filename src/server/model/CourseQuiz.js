const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('stupen', 'root', 'qwe123', {
  host: 'localhost',
  dialect: 'mysql'
});

const CourseQuiz = sequelize.define("course_quiz", {
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  choices: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  answer: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  paranoid: true,
});

(async () => {
  await sequelize.sync();
  // Code here
})();

module.exports = CourseQuiz;

// const User = sequelize.define('user', {
// });


// // `sequelize.define` also returns the model
// console.log('test' + User === sequelize.models.User); // true

