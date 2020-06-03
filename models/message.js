'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.STRING,
    formattedDate: {
      type: DataTypes.VIRTUAL,
      get () {
        const date = this.get('createdAt')
        let hours = date.getHours();
        let mins = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        hours = hours % 12;
        hours = hours ? hours : 12; 
        mins = mins < 10 ? '0'+mins : mins;
        var messageTime = `${hours}:${mins} ${ampm} on ${month}/${day}/${year}`
        return messageTime;
       

        // if (mins < 10) {
        //   return `${hours}:0${mins} ${ampm} on ${month}/${day}/${year}`
        // } else {
        //   return `${hours}:${mins} ${ampm} on ${month}/${day}/${year}`
        // }
      }
    }
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.User);
    Message.belongsTo(models.Room);
  };
  return Message;
};