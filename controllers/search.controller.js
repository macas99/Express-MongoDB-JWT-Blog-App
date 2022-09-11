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
            postService.searchPostLike(input).then((posts) => {
                let html = "";
                if (user) {
                    const div = "<h5>User</h5><div class='container mb-2 post-prev'>";
                    const a = "<a class='link-content' href='/user/" + user.name + "'>";
                    const end = user.name + "</a></div>";
                    html += div + a + end;
                }
                if (posts.length > 0) {
                    html += "<h5>Posts</h5>";
                    posts.forEach((post) => {
                        const div = "<div class='container mb-2 post-prev'>";
                        const a = "<a class='link-content' href='/posts/" + post._id + "'>"
                        const end = post.title + "</a></div>";
                        html += div + a + end;
                    });
                }
                return html === "" ? res.send("No result") : res.send(html);
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