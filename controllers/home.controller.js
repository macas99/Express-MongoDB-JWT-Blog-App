const userService = require('../services/user.service');

const getSignUpPage = function (req, res) {
    res.render('signup');
}

const getHomePage = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    userService.getUserByToken(token).then((user) => {
        res.send(user);
    });
    
}

module.exports = {
    getSignUpPage,
    getHomePage
};