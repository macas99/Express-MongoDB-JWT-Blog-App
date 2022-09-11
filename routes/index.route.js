const express = require('express');
const home = require('./home.route');
const user = require('./user.route');
const post = require('./post.route');
const search = require('./search.route');

const router = express.Router();

router.use('/', home);
router.use('/user', user);
router.use('/posts', post);
router.use('/search', search);

module.exports = router;