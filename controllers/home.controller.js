const userService = require('../services/user.service');
const postService = require('../services/post.service');
const { COOKIE_LIFETIME } = require('../config/config');

//render signup.ejs
const getSignUpPage = function (req, res) {
    res.render('signup');
}

//get user by token, get all posts of accounts followed by user and display them newest -> oldest
const getHomePage = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    userService.getUserByToken(token).then((user) => {
        postService.getPostsByFollowing(user.following).then((posts) => {
            const token = userService.createUserToken(user.name);
            res.cookie("token", token, { expires: new Date(Date.now() + COOKIE_LIFETIME), httpOnly: true });
            res.render('home', { username: user.name, posts: posts });
        }).catch((err) => {
            res.redirect('user/login');
        });
    }).catch((err) => {
        res.redirect('user/login');
    });

}

module.exports = {
    getSignUpPage,
    getHomePage
};