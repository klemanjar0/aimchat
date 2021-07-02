const FriendsService = require('../service/friends.service')

class FriendsController {

  async addFriend(req, res) {
    try {
      const data = (await FriendsService.addFriend(req.user.id, req.body.friendId));
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
  async addFriendByName(req, res) {
    try {
      const data = (await FriendsService.addFriendByName(req.user.id, req.body.name));
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
  async removeFriend(req, res) {
    try {
      const data = (await FriendsService.removeFriend(req.user.id, req.body.friendId));
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
  async getFriends(req, res) {
    try {
      const data = (await FriendsService.getFriends(req.user.id));
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
  async getUsers(req, res) {
    try {
      console.log(req.query)
      const data = (await FriendsService.getUsers(req.query.name));
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
}

module.exports = new FriendsController();
