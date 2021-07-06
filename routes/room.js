const express = require('express')
const router = express.Router()
const RoomController = require('../controllers/room.controller')
const passport = require('passport');

router.post('/', passport.authenticate('jwt', {session: false}, null), RoomController.createRoom);
router.get('/my_rooms', passport.authenticate('jwt', {session: false}, null), RoomController.getRoomsByOwnerId);
router.delete('/', passport.authenticate('jwt', {session: false}, null), RoomController.deleteRoom);

module.exports = router;
