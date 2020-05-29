'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    rm_name: DataTypes.STRING
  }, {});
  Room.associate = function(models) {
    Room.hasMany(models.Message, { foreignKey: 'id' })
    Room.belongsToMany(models.User, {through: 'UserRooms'})// associations can be defined here
  };
  return Room;
};