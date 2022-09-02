const postService = require('../services/post.service');
const userService = require('../services/user.service');

const getPost = function (req, res) {
    const token = req.cookies.token;
    const postId = req.params.postId;

    if (!token) {
        return res.redirect('/user/login');
    }

    userService.getUserByToken(token).then((user) => {
        postService.getById(postId).then((post) => {
            res.render('post', { post: post, username: user.name });
        });
    }).catch((err) => {
        res.redirect('/home');
    })

}

module.exports = {
    getPost
};