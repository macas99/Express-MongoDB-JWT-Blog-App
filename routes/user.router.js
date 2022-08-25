const express = require('express');
const router = express.Router({ mergeParams: true });

const userController = require('../controllers/user.controller');

router.route('/')
    .get(userController.saveUser);

module.exports = router;