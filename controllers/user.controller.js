const userService = require('../services/user.service');
const postService = require('../services/post.service');

const saveUser = function (req, res) {
    userService.saveUser(req.body.username, req.body.email, req.body.password).then((token) => {
        res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.redirect('/home');
    }).catch((error) => {
        console.log(error);
        res.send("Something went wrong");
    });
}

const getLoginPage = function (req, res) {
    res.render('login');
}

const login = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    userService.verifyPassword(username, password).then((user) => {
        if (user) {
            const token = userService.createUserToken(username);
            res.cookie("token", token, { expires: new Date(Date.now() + 900000), httpOnly: true });
            res.redirect('/home');
        } else {
            res.redirect('/user/login');
        }
    }).catch((error) => {
        console.log(error)
        res.send("error");
    });
}

const loadProfile = function (req, res) {
    const token = req.cookies.token;

    const username = req.params.user;
    userService.getUserByName(username).then((profile) => {
        postService.getPostsByAuthor(username).then((posts) => {
            if (token) {
                userService.getUserByToken(token).then((user) => {
                    res.render('profile', { profile: profile, posts: posts, user: user });
                });
            } else {
                res.render('profile', { profile: profile, posts: posts, user: false });
            }
        });
    }).catch((err) => {
        res.redirect('/home');
    })
}

const updateFollow = function (req, res) {
    const username = req.body.name;
    const profile = req.body.profile;
    const follow = req.body.follow;
    userService.updateFollow(username, profile, follow).then(() => {
        return res.sendStatus(200);
    }).catch(() => {
        return res.sendStatus(500);
    });

}

module.exports = {
    saveUser,
    getLoginPage,
    login,
    loadProfile,
    updateFollow
};