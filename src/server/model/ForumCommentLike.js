const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('stupen', 'root', 'qwe123', {
  host: 'localhost',
  dialect: 'mysql'
});

const ForumCommentLike = sequelize.define("forum_comment_like", {
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
}, {
  sequelize,
  paranoid: true,
});

(async () => {
  await sequelize.sync();
  // Code here
})();

module.exports = ForumCommentLike;

