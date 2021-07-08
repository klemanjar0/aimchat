const express = require('express');
const router = express.Router();

const user = require('./user');
const friends = require('./friends');
const rooms = require('./room');
const message = require('./message');

router.use('/user', user);
router.use('/friends', friends);
router.use('/room', rooms);
router.use('/message', message);

module.exports = router;
