const { Strategy, ExtractJwt } = require("passport-jwt");

const secret = process.env.SECRET
const { User } = require("../models");
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findOne({where: {id: payload.id}})
        .then((user) => {
          if(user){
            return done(null, {
              id: user.id,
              username: user.name
            });
          }
          return done(null, false);
        })
        .catch((err) => console.error(err))
    })
  );
};
