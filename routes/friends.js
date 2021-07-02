const express = require('express')
const router = express.Router()
const passport = require('passport');
const FriendsController = require('../controllers/friends.controller')
const auth = require('../config/auth');

router.get('/my', passport.authenticate('jwt', {session: false}, null), FriendsController.getFriends);
router.get('/users', passport.authenticate('jwt', {session: false}, null), FriendsController.getUsers);
router.post('/add_friend', passport.authenticate('jwt', {session: false}, null), FriendsController.addFriend);
router.post('/add_friend_by_name', passport.authenticate('jwt', {session: false}, null), FriendsController.addFriendByName);
router.delete('/remove_friend', passport.authenticate('jwt', {session: false}, null), FriendsController.removeFriend);

module.exports = router;
