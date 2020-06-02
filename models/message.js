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

        if (hours < 12) {
          if (mins < 10) {
            return `${hours}:0${mins}am on ${month}/${day}/${year}`
          } else {
            return `${hours}:${mins}am on ${month}/${day}/${year}`
          }
        } else {
          if (mins < 10) {
            return `${hours - 12}:0${mins}pm on ${month}/${day}/${year}`
          } else {
            return `${hours - 12}:${mins}pm on ${month}/${day}/${year}`
          }
        }
    }
    }
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.User);
    Message.belongsTo(models.Room);
  };
  return Message;
};