const express = require('express');
const router = express.Router({ mergeParams: true });

const homeController = require('../controllers/home.controller');

router.route('/')
    .get(homeController.getIndex);

module.exports = router;