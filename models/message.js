'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, { foreignKey: 'id' })
  };
  return Message;
};