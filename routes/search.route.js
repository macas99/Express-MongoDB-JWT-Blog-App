const express = require('express');
const router = express.Router({ mergeParams: true });

const searchController = require('../controllers/search.controller');

router.route('/')
    .get(searchController.getSearch);

router.route('/')
    .post(searchController.search);

module.exports = router;