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
            console.log(posts);
        }).catch((err) => {
            console.log(err);
        });
        res.render('home', {username: user.name});
    });
    
}

module.exports = {
    getSignUpPage,
    getHomePage
};