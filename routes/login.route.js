const express = require('express');
const router = express.Router({ mergeParams: true });

const loginController = require('../controllers/login.controller');

router.route('/')
    .get(loginController.getLoginPage);

module.exports = router;