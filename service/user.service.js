require('dotenv').config();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = process.env.SECRET;

const validEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const validPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
const validPhone = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;

class UserService {
  async register(data) {
    const errors = [];

    if(!data) {
      errors.push({
        field: "data",
        messages: "Empty data."
      })
      throw errors;
    }

    const { email, password, name } = data;

    if(email) {
      if(!validEmail.test(email)) {
        errors.push({
          field: 'email',
          message: 'Incorrect email.'
        });
      }
      else {
        const user = await User.findOne({
          where: {
            email
          }
        });
        if(user) {
          errors.push({
            field: 'email',
            message: 'That email already exists.'
          })
        }
      }
    }
    else{
      errors.push({
        field: 'email',
        message: 'Empty email.'
      });
    }

    if(password) {
      if(!validPassword.test(password)) {
        errors.push({
          field: 'password',
          message: 'Password should contain at least 1 digit, 1 capital letter and 1 small letter.'
        })
      }
    }
    else {
      errors.push({
        field: 'password',
        message: 'Empty password.'
      });
    }

    if(!name) {
      errors.push({
        field: 'name',
        message: 'Empty name'
      });
    }
    else if(name.length < 3) {
      errors.push({
        field: 'name',
        message: 'Name should contain at least 3 characters.'
      });
    }

    if(errors.length !== 0) throw errors;

    const user = await User.create({
      email,
      password,
      name
    });

    const payload = {
      id: user.id
    };

    const token = await jwt.sign(payload, secret);

    return {
      accessToken: `Bearer ${token}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    };
  }

  async login(data){
    const errors = [];

    if(!data) {
      errors.push({
        field: "data",
        messages: "Empty data."
      })
      throw errors;
    }

    const { email, password } = data;

    if(!email){
      errors.push({
        field: 'email',
        message: 'Empty email.'
      });
    }

    if(!password){
      errors.push({
        field: 'password',
        message: 'Empty password.'
      })
    }

    if(errors.length !== 0) throw errors;

    const user = await User.findOne({
      where: {
        email
      }
    });

    if(!user){
      errors.push({
        field:"password",
        message:"Wrong email or password"
      });

      throw errors;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      errors.push({
        field:"password",
        message:"Wrong email or password"
      });

      throw errors;
    }

    const payload = {
      id: user.id
    };

    const token = await jwt.sign(payload, secret);

    return {
      accessToken: `Bearer ${token}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    };
  }

  async me(id) {
    const user = await User.findByPk(id);
    return {
      id: user.id,
      email: user.email,
      name: user.name
    }
  }
}

module.exports = new UserService();
