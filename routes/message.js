const express = require('express')
const router = express.Router()
const MessageController = require('../controllers/message.controller')
const passport = require('passport');

router.post('/', passport.authenticate('jwt', {session: false}, null), MessageController.createMessage);
router.get('/', passport.authenticate('jwt', {session: false}, null), MessageController.getMessageByRoomId);


module.exports = router;
