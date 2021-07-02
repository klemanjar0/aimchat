const DataTypes = require('sequelize');

module.exports = (sequelize) => {
  const FriendShip = sequelize.define("friendship", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    friendId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return FriendShip;
}
