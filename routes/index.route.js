const express = require('express');
const home = require('./home.route');
const user = require('./user.route');
const login = require('./login.route');

const router = express.Router();

router.use('/', home);
router.use('/user', user);
router.use('/login', login);

module.exports = router;