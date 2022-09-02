const userService = require('../services/post.service');

const getPost = function (req,res) {
    const post_id = req.params.postId;
    res.send(post_id);
}

module.exports = {
    getPost
};