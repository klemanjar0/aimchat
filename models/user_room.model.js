const DataTypes = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const UserRoom = sequelize.define('user_room', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
    },
    isMuted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
  return UserRoom;
}
