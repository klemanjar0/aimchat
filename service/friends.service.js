require('dotenv').config();
const { User, FriendShip } = require('../models');
const { Op } = require("sequelize");

class FriendsService {
  async addFriend(userId, friendId) {
    const errors = [];
    if(userId) {
      const user = await User.findByPk(userId);
      if (!user){
        errors.push({
          field: 'id',
          message: 'No user found with ID '+userId
        });
      }
    }
    else{
      errors.push({
        field: 'id',
        message: 'Id of required.'
      });
    }

    if(friendId) {
      const user = await User.findByPk(friendId);
      if (!user){
        errors.push({
          field: 'id',
          message: 'No user to add found with ID '+friendId
        });
      }
    }
    else{
      errors.push({
        field: 'friendId',
        message: 'friendId of required.'
      });
    }
    const friend = await User.findByPk(friendId);
    if(errors.length !== 0) throw errors;

    const friendship = await FriendShip.create({
      userId,
      friendId
    });

    return {
      friendship: friendship,
      friend: friend,
    };
  }

  async addFriendByName(userId, name) {
    const errors = [];
    if(userId) {
      const user = await User.findByPk(userId);
      if (!user){
        errors.push({
          field: 'id',
          message: 'No user found with ID '+userId
        });
      }
    }
    else{
      errors.push({
        field: 'id',
        message: 'Id of required.'
      });
    }

    if(name) {
      const user = await User.findOne({where:{name: name}});
      if (!user){
        errors.push({
          field: 'id',
          message: 'No user to add found with name '+ name
        });
      }
    }
    else{
      errors.push({
        field: 'name',
        message: 'name of required.'
      });
    }
    if(errors.length !== 0) throw errors;

    const friend = await User.findOne({where:{name: name}});
    const friendship = await FriendShip.create({
      userId : userId,
      friendId: friend.id
    });

    return friendship;
  }

  async removeFriend(userId, friendId) {
    const errors = [];
    if(userId) {
      const user = await User.findOne
      (
        {
          where: {
            id: friendId
          }
        }
      );
      if (!user){
        errors.push({
          field: 'friendId',
          message: 'No user found with friendId '+friendId
        });
      }
    }
    else{
      errors.push({
        field: 'friendId',
        message: 'friendId of required.'
      });
    }
    if(errors.length !== 0) throw errors;
    const friend = await User.findByPk(friendId);
    const friendship = await FriendShip.findOne(
      {
        where :
          {
            [Op.and]:
              [
                {  userId : userId },
                { friendId: friendId }
              ]
          }
      }
    );
    await friendship.destroy(
      {
        where :
          {
            [Op.and]: [
              {  userId : userId },
              { friendId: friendId }
            ]
          }
      }
    );
    return {
      friendship: friendship,
      friend: friend,
    };
  }
  async getUsers(name) {
    const errors = [];
    if(!name) {
      errors.push({
        field: 'name',
        message: 'Empty name'
      });
    }
    if(errors.length !== 0) throw errors;
    const users = await User.findAll({
      limit: 7,
      where :
        {
          name:
            {
              [Op.like]: "%"+name+"%"
            }
        }
    })
    const result = users.map((it)=> {
      return {
        id: it.id,
        name: it.name,
        email: it.email,
        createdAt: it.createdAt,
        updatedAt: it.updatedAt,
      }
    })
    return result;
  }

  async getFriends(userId) {
    const errors = [];
    if(userId) {
      const user = await User.findByPk(userId);
      if (!user){
        errors.push({
          field: 'id',
          message: 'No user found with ID '+userId
        });
      }
    }
    else{
      errors.push({
        field: 'id',
        message: 'Id of required.'
      });
    }
    const friendships = await FriendShip.findAll({
      where: {
        userId: userId
      }
    })
    if(errors.length !== 0) throw errors;
    const users = friendships.map(it => User.findByPk(it.friendId));
    const result = await Promise.all(users)
      .then(responses => responses.map(r => r.toJSON()));
    const finalRes = result.map(it => {
      return {
        id: it.id,
        name: it.name,
        email: it.email,
        createdAt: it.createdAt,
        updatedAt: it.updatedAt,
      };
    });
    return finalRes;
  }
}

module.exports = new FriendsService();
