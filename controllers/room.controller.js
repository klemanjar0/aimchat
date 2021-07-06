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
  async deleteRoom(req, res) {
    try {
      const data = (await RoomService.deleteRoom(req.user.id, req.query.id));
      try {
        res.status(200).json(data)
      }
      catch (e) {
        console.log(e)
      }
    }
    catch(e) {
      if(e[0].field === 'id'){
        res.status(403).json(e);
      }
      else
        res.status(422).json(e);
    }
  }
}

module.exports = new RoomController();
