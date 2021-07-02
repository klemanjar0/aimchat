const express = require('express');
const router = express.Router();

const user = require('./user');
const friends = require('./friends');

router.use('/user', user);
router.use('/friends', friends);

module.exports = router;
