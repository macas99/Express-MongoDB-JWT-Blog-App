const express = require('express');
const router = express.Router({ mergeParams: true });

const userController = require('../controllers/user.controller');

router.route('/login')
    .get(userController.getLoginPage);

router.route('/login')
    .post(userController.login);

router.route('/signup')
    .post(userController.saveUser);

module.exports = router;