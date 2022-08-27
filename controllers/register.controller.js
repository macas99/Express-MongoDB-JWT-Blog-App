const userService = require('../services/user.service');

const saveUser = function (req, res) {
    userService.saveUser(req.body.username, req.body.email, req.body.password).then((token) => {
        res.json({accessToken: token});
    }).catch((error) => {
        console.log(error);
        res.send("Something went wrong");
    });
}

module.exports = {
    saveUser
};