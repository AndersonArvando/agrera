const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('stupen', 'root', 'qwe123', {
  host: 'localhost',
  dialect: 'mysql'
});

const CourseQuizUser = sequelize.define("course_quiz_user", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  quiz_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  correct: {
    type: DataTypes.TINYINT,
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

module.exports = CourseQuizUser;

// const User = sequelize.define('user', {
// });


// // `sequelize.define` also returns the model
// console.log('test' + User === sequelize.models.User); // true

