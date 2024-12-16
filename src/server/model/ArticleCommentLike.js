const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('stupen', 'root', 'qwe123', {
  host: 'localhost',
  dialect: 'mysql'
});

const ArticleCommentLike = sequelize.define("article_comment_like", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  comment_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  article_id: {
    type: DataTypes.INTEGER,
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

module.exports = ArticleCommentLike;

// const User = sequelize.define('user', {
// });


// // `sequelize.define` also returns the model
// console.log('test' + User === sequelize.models.User); // true

