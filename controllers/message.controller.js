const MessageService = require('../service/message.service');

class MessageController {
  async createMessage(req, res) {
    try {
      const data = (await MessageService.createMessage(req.user.id, req.body));
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
  async getMessageByRoomId(req, res) {
    try {
      const data = (await MessageService.getRoomMessages(req.query.roomId));
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

module.exports = new MessageController();
