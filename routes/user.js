const express = require('express')
const router = express.Router()
const passport = require('passport');
const UserController = require('../controllers/user.controller')

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/me', passport.authenticate('jwt', {session: false}, null), UserController.me);

module.exports = router;
