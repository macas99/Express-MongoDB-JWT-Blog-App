const express = require('express');
const router = express.Router({ mergeParams: true });

const postController = require('../controllers/post.controller');

router.route('/:postId')
    .get(postController.getPost);

router.route('/like')
    .post(postController.updateLikes);

module.exports = router;