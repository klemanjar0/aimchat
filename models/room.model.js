const DataTypes = require('sequelize');

module.exports = (sequelize) => {
  const Room = sequelize.define("room", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  Room.associate = (models) => {
    Room.belongsToMany(models.User, {
      through: models.UserRoom,
      as: "room",
      foreignKey: "roomId",
    });
  };
  Room.associate = (models) => {
    Room.hasMany(models.Message, {
      onUpdate: "cascade",
      onDelete: "cascade"
    });
  };
  return Room;
}
