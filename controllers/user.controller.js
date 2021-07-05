const UserService = require('../service/user.service')


class UserController {

  async register(req, res) {
    try {
      const data = (await UserService.register(req.body));
      try {
        res.status(200).json(data)
      }
      catch (e) {
        console.log(e)
      }
    }
    catch(e) {
      res.status(422).json(e);
    }
  }

  async login(req, res) {
    try {
      const result = await UserService.login(req.body);
      res.status(200).json(result);
    }
    catch(e) {
      res.status(422).json(e);
    }
  }

  async me(req, res) {
    try{
      const result = await UserService.me(req.user.id);
      res.status(200).json(result);
    }
    catch(e) {
      console.log(e);
      res.status(401);
    }
  }

}

module.exports = new UserController();
