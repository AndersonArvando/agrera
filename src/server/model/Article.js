const { Sequelize, DataTypes } = require('sequelize');
const CategoryArticle = require('./CategoryArticle');
const sequelize = new Sequelize('stupen', 'root', 'qwe123', {
  host: 'localhost',
  dialect: 'mysql'
});

const Article = sequelize.define("article", {
  title: {
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
  image: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  source: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  paranoid: true,
});
Article.belongsTo(CategoryArticle, { foreignKey: 'category_id', as: 'category', onDelete: 'CASCADE' });

// Article.hasOne(CategoryArticle, {
//   foreignKey: {
//     name: 'category'
//   },
// });
(async () => {
  await sequelize.sync();
  // Code here
})();

module.exports = Article;

// const User = sequelize.define('user', {
// });


// // `sequelize.define` also returns the model
// console.log('test' + User === sequelize.models.User); // true

