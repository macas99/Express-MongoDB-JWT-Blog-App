const express = require('express');
const router = express.Router({ mergeParams: true });

const postController = require('../controllers/post.controller');

router.route('/:postId')
    .get(postController.getPost);

module.exports = router;