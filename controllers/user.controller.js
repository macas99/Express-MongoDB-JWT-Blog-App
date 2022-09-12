const userService = require('../services/user.service');
const postService = require('../services/post.service');
const { post } = require('request');
const { COOKIE_LIFETIME } = require('../config/config');

const saveUser = function (req, res) {
    userService.saveUser(req.body.username, req.body.email, req.body.password).then((token) => {
        res.cookie("token", token, { expires: new Date(Date.now() + COOKIE_LIFETIME), httpOnly: true });
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
            res.cookie("token", token, { expires: new Date(Date.now() + COOKIE_LIFETIME), httpOnly: true });
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
                }).catch(() => {
                    res.render('profile', { profile: profile, posts: posts, user: false });
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
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    const username = req.body.name;
    const profile = req.body.profile;
    const follow = req.body.follow;
    userService.updateFollow(username, profile, follow).then(() => {
        return res.sendStatus(200);
    }).catch(() => {
        return res.sendStatus(500);
    });

}

const getSettings = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    userService.getUserByToken(token).then((user) => {
        res.render('settings', { username: user.name });
    }).catch(() => {
        res.redirect('/user/login');
    })
}

const logout = function (req, res) {
    res.clearCookie("token");
    return res.redirect('/user/login');
}

const deleteUser = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    userService.getUserByToken(token).then((user) => {
        postService.unlikeAll(user.name).then(() => {
            userService.unfollowAll(user.name).then(() => {
                postService.deleteAllUser(user.name).then(() => {
                    userService.deleteUser(user.name).then(() => {
                        res.clearCookie("token");
                        return res.redirect('/user/login');
                    })
                })
            })
        })
    }).catch(() => {
        res.redirect('/user/login');
    })
}

module.exports = {
    saveUser,
    getLoginPage,
    login,
    loadProfile,
    updateFollow,
    getSettings,
    logout,
    deleteUser
};