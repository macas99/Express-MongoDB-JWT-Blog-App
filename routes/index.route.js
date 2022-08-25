const express = require('express');
const home = require('./home.route');
const user = require('./user.router');

const router = express.Router();

router.use('/', home);
router.use('/user', user);

module.exports = router;