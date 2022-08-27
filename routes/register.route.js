const express = require('express');
const router = express.Router({ mergeParams: true });

const registerController = require('../controllers/register.controller');

router.route('/')
    .post(registerController.saveUser);

module.exports = router;