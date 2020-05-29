'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Message, { foreignKey: 'id' })
    User.belongsToMany(models.Room, {through: 'UserRooms'})// associations can be defined here
  };
  return User;
};