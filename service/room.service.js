const { User, Room, UserRoom } = require('../models');

class RoomService {
  async createRoom(data) {
    const errors = [];
    if(!data){
      errors.push({
        field: 'data',
        message: 'Empty data',
      });
      throw errors;
    }
    const { name, ownerId } = data;
    if(!name){
      errors.push({
        field: 'name',
        message: 'Empty name.'
      });
      throw errors;
    } else {
      if(name.length < 3){
        errors.push({
          field: 'name',
          message: 'Name should contain at least 3 characters.'
        });
        throw errors;
      }
    }
    const user = await User.findByPk(ownerId);
    if(!user){
      errors.push({
        field: 'ownerId',
        message: 'No user to add found with ID'
      });
      throw errors;
    }
    if(errors.length !== 0) throw errors;

    const room = await Room.create({
      name: name,
      ownerId: ownerId,
    });
    await UserRoom.create({
      role: 'creator',
      roomId : room.id,
      userId: ownerId,
    })
    return room;
  }
  async getRoomsByOwnerId(id){
    const errors = [];
    if(!id){
      errors.push({
        field: 'id',
        message: 'Empty id',
      });
      throw errors;
    }
    const user = await User.findByPk(id);
    if(!user){
      errors.push({
        field: 'id',
        message: 'No user found with declared ID'
      });
      throw errors;
    }
    if(errors.length !== 0) throw errors;
    const userRooms = await UserRoom.findAll({where: {userId: id}});
    const rooms = userRooms.map(it => Room.findByPk(it.roomId));
    const result = await Promise.all(rooms)
      .then(responses => responses.map(r => r.toJSON()));
    return result;
  }
  async deleteRoom(userId, id){
    const errors = [];
    if(!id){
      errors.push({
        field: 'id',
        message: 'Empty id',
      });
      throw errors;
    }
    const room = await Room.findByPk(id);
    if(!room){
      errors.push({
        field: 'id',
        message: 'Room not found',
      });
      throw errors;
    }
    if(room.ownerId !== userId){
      errors.push({
        field: 'user',
        message: 'You are not allowed to delete this room',
      });
      throw errors;
    }
    await Room.destroy({where: {id: id}})
    return room;
  }
}

module.exports = new RoomService();
