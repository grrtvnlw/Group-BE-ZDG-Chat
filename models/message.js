'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.STRING,
    formattedDate: {
      type: DataTypes.VIRTUAL,
      get () {
        const date = this.get('createdAt')
        const mins = date.getMinutes()
        const hours = date.getHours()
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        return `${hours}:${mins} on ${month}/${day}/${year}`
    }
    }
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.User);
    Message.belongsTo(models.Room);
  };
  return Message;
};