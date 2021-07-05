const express = require('express');
const router = express.Router();

const user = require('./user');
const friends = require('./friends');
const rooms = require('./room');

router.use('/user', user);
router.use('/friends', friends);
router.use('/room', rooms);

module.exports = router;
