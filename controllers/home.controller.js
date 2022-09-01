const userService = require('../services/user.service');
const postService = require('../services/post.service');

const getSignUpPage = function (req, res) {
    res.render('signup');
}

const getHomePage = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    userService.getUserByToken(token).then((user) => {
        postService.getPostsByFollowing(user.following).then((posts) => {
            res.render('home', { username: user.name, posts: posts });
        }).catch((err) => {
            console.log(err);
        });
        // res.render('home', {username: user.name});
    });

}

const updateLikes = function (req, res) {
    const username = req.body.name;
    const post = req.body.post;
    const remove = req.body.removeLike; //boolean
    postService.updateLikes(username, post, remove).then(() => {
        return res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    });
}

module.exports = {
    getSignUpPage,
    getHomePage,
    updateLikes
};