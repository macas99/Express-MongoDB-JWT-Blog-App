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

const updateLikes = function (req, res) {
    const username = req.body.name;
    const post = req.body.post;
    const remove = req.body.removeLike;
    postService.updateLikes(username, post, remove).then(() => {
        return res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    });
}

const getCreatePost = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    userService.getUserByToken(token).then((user) => {
        res.render('create', {username: user.name});
    }).catch((err) => {
        res.redirect('/home');
    })
}


module.exports = {
    getPost,
    updateLikes,
    getCreatePost
};