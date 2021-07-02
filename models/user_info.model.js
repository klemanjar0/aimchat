const DataTypes = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const UserInfo = sequelize.define("user_info", {
    lastSeen: {
      type: DataTypes.DATE
    }
  },
    {
      timestamps: false,
    }
  );
  return UserInfo
}
