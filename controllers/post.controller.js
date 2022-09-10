const postService = require('../services/post.service');
const userService = require('../services/user.service');

const getPost = function (req, res) {
    const token = req.cookies.token;
    const postId = req.params.postId;

    if (!token) {
        return res.redirect('/user/login');
    }

    userService.getUserByToken(token).then((user) => {
        postService.getById(postId).then((post) => {
            res.render('post', { post: post, username: user.name });
        });
    }).catch((err) => {
        res.redirect('/home');
    })

}

const updateLikes = function (req, res) {
    const username = req.body.name;
    const post = req.body.post;
    const remove = req.body.removeLike;
    postService.updateLikes(username, post, remove).then(() => {
        return res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(500);
    });
}

const getCreatePost = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    userService.getUserByToken(token).then((user) => {
        res.render('create', { username: user.name });
    }).catch(() => {
        res.redirect('/home');
    })
}

const createPost = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/home');
    }

    const title = req.body.postTitle;
    const postBody = req.body.postBody;
    const author = req.body.username;

    postService.savePost(title, postBody, author).then((post) => {
        const id = post._id;
        res.redirect('/posts/' + id);
    }).catch((err) => {
        console.log(err);
        res.redirect('/home');
    });
}

const getEdit = function (req, res) {
    const token = req.cookies.token;
    const postId = req.params.postId;

    if (!token) {
        return res.redirect('/user/login');
    }

    userService.getUserByToken(token).then((user) => {
        postService.getById(postId).then((post) => {
            if (user.name != post.author) {
                res.redirect('/user/login');
            } else {
                res.render('edit', { post: post, username: user.name });
            }
        });
    }).catch(() => {
        res.redirect('/home');
    })
}

const updatePost = function (req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/user/login');
    }

    const postId = req.params.postId;
    const title = req.body.postTitle;
    const postBody = req.body.postBody;
    const author = req.body.username;

    userService.getUserByToken(token).then((user) => {
        if (user.name === author) {
            postService.updatePost(postId, title, postBody).then(() => {
                res.redirect('/posts/' + postId);
            });
        } else {
            res.redirect(403, '/home');
        }
    }).catch(() => {
        res.redirect(500, '/home');
    })
}

module.exports = {
    getPost,
    updateLikes,
    getCreatePost,
    createPost,
    getEdit,
    updatePost
};