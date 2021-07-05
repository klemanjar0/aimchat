const RoomService = require('../service/room.service')

class RoomController {

  async createRoom(req, res) {
    try {
      const data = (await RoomService.createRoom(req.body));
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
  async getRoomsByOwnerId(req, res) {
    try {
      const data = (await RoomService.getRoomsByOwnerId(req.user.id));
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

module.exports = new RoomController();
