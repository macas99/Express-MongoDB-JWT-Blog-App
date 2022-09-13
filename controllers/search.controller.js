const postService = require('../services/post.service');
const userService = require('../services/user.service');

const getSearch = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    userService.getUserByToken(token).then((user) => {
        res.render('search', { username: user.name });
    }).catch(() => {
        res.redirect('/user/login');
    });
}

const search = function (req, res) {
    const input = req.body.input;
    if (input) {
        userService.searchUser(input).then((users) => {
            postService.searchPostLike(input).then((posts) => {
                return res.send(JSON.stringify({ users: users, posts: posts }));
            }).catch(() => {
                res.send("error");
            });
        }).catch(() => {
            res.send("error");
        });
    }
}

module.exports = {
    getSearch,
    search
};