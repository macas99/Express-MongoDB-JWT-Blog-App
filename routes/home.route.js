const express = require('express');
const router = express.Router({ mergeParams: true });

const homeController = require('../controllers/home.controller');

router.route('/')
    .get(homeController.getSignUpPage);

router.route('/home')
    .get(homeController.getHomePage);

router.route('/home')
    .post(homeController.updateLikes);

module.exports = router;