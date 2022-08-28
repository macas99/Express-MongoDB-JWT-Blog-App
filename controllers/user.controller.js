const userService = require('../services/user.service');

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

module.exports = {
    saveUser,
    getLoginPage,
    login
};