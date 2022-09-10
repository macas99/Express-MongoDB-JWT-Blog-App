const express = require('express');
const router = express.Router({ mergeParams: true });

const postController = require('../controllers/post.controller');

router.route('/create')
    .get(postController.getCreatePost);

router.route('/:postId')
    .get(postController.getPost);

router.route('/edit/:postId')
    .get(postController.getEdit);

router.route('/create')
    .post(postController.createPost);

router.route('/like')
    .post(postController.updateLikes);

module.exports = router;