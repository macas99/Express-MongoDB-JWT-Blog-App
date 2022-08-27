const express = require('express');
const home = require('./home.route');
const user = require('./user.route');
const login = require('./login.route');
const register = require('./register.route');

const router = express.Router();

router.use('/', home);
router.use('/user', user);
router.use('/login', login);
router.use('/register', register);

module.exports = router;