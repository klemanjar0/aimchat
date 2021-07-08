const { User, Room, Message } = require('../models');

// TODO : MIDDLEWARES TO CHECK ACCESS TO ROOM MESSAGES BY USER ID (IN USER_ROOM TABLE)

class MessageService {
  async createMessage(userId, data) {
    const errors = [];
    if(!data){
      errors.push({
        field: 'data',
        message: 'Empty data',
      });
      throw errors;
    }
    const { text, roomId } = data;
    if(!text){
      errors.push({
        field: 'text',
        message: 'Empty text.'
      });
      throw errors;
    } else {
      if(text.length < 3){
        errors.push({
          field: 'text',
          message: 'Name should contain at least 1 character.'
        });
        throw errors;
      }
    }
    const user = await User.findByPk(userId);
    if(!user){
      errors.push({
        field: 'userId',
        message: 'No user found with ID'
      });
      throw errors;
    }
    const room = await Room.findByPk(roomId);
    if(!room){
      errors.push({
        field: 'roomId',
        message: 'No room found with ID'
      });
      throw errors;
    }
    if(errors.length !== 0) throw errors;

    const message = await Message.create({
      text: text,
      ownerId: userId,
      roomId: roomId
    });
    return message;
  }

  async getRoomMessages(roomId){
    const errors = [];
    const room = await Room.findByPk(roomId);
    if(!room){
      errors.push({
        field: 'roomId',
        message: 'No room found with ID'
      });
      throw errors;
    }
    const messages = await Message.findAll({where: {roomId: roomId}});
    return messages;
  }
}

module.exports = new MessageService();
