const postService = require('../services/post.service');
const userService = require('../services/user.service');

const getSearch = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    userService.getUserByToken(token).then((user) => {
        res.render('search', { username: user.name });
    });
}

const search = function (req, res) {

    const input = req.body.input;
    if (input) {
        userService.getUserByName(input).then((user) => {
            if (user) {
                const div = "<div class='container mb-2 post-prev'>";
                const a = "<a class='link-content' href='/user/" + user.name + "'>";
                const end = user.name + "</a></div>";
                const html = div + a + end;
                res.send(html);
            } else {
                res.send("no result");
            }
        });
    }
}
module.exports = {
    getSearch,
    search
};