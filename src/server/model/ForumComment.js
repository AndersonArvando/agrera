const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('stupen', 'root', 'qwe123', {
  host: 'localhost',
  dialect: 'mysql'
});

const ForumComment = sequelize.define("forum_comment", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  forum_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  like: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
}, {
  sequelize,
  paranoid: true,
});

(async () => {
  await sequelize.sync();
  // Code here
})();

module.exports = ForumComment;

// const User = sequelize.define('user', {
// });


// // `sequelize.define` also returns the model
// console.log('test' + User === sequelize.models.User); // true

