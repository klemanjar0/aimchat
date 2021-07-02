const DataTypes = require('sequelize');

module.exports = (sequelize) => {
  const Message = sequelize.define("message", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    delivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return Message;
}
