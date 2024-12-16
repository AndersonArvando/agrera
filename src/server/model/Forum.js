const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('stupen', 'root', 'qwe123', {
  host: 'localhost',
  dialect: 'mysql'
});

const Forum = sequelize.define("forum", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  question: {
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
}, {
  sequelize,
  paranoid: true,
});

(async () => {
  await sequelize.sync();
  // Code here
})();

module.exports = Forum;

// const User = sequelize.define('user', {
// });


// // `sequelize.define` also returns the model
// console.log('test' + User === sequelize.models.User); // true

