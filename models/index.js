require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: process.env.DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl : true,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    }
  }
);


sequelize.authenticate().then(
  async () => {
    await sequelize.sync({ force: false })
      .then(function(err) {
        console.log('The database is connected and stable.');
      }, function (err) {
        console.log('An error occurred while creating the table:', err);
      });
  }
);


const models = {
  sequelize,
  User: require('./user.model')(sequelize),
  Room: require('./room.model')(sequelize),
  Message: require('./message.model')(sequelize),
  FriendShip: require('./friendship.model')(sequelize),
  UserInfo: require('./user_info.model')(sequelize),
  UserRoom: require('./user_room.model')(sequelize),
}

Object.keys(models).forEach((modelName) => {
  if("associate" in models[modelName]){
    models[modelName].associate(models);
  }
});

module.exports = models;
