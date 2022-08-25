const userService = require('../services/user.service');

const getUserPage = function (req, res) {
    res.render('user');
}

const saveUser = function (req, res) {
    userService.saveUser().then(() => {
        res.send("saved");
    }).catch((error) => {
        console.log(error);
        res.send("error");
    });
}

const findAll = function (req, res) {
    userService.findAll().then((users) => {
        res.send(users);
    }).catch((error) => {
        console.log(error);
        res.send("error");
    });
}

module.exports = {
    getUserPage,
    saveUser,
    findAll
};