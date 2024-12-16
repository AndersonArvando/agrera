const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('stupen', 'root', 'qwe123', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mobile_no: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
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

module.exports = User;

