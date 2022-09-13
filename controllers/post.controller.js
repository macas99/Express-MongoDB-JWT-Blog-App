const postService = require('../services/post.service');
const userService = require('../services/user.service');

//get post by id and display it (if user logged in)
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
        res.redirect('/user/login');
    })

}

//update likes on a post, remove = true => remove like 
const updateLikes = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(401);
    }

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

//render create.ejs if user is logged in
const getCreatePost = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    userService.getUserByToken(token).then((user) => {
        res.render('create', { username: user.name });
    }).catch(() => {
        res.redirect('/user/login');
    })
}

//save post to database and redirect to new post
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

//render edit.ejs (edit post page) if user is logged in
const getEdit = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    const postId = req.params.postId;

    userService.getUserByToken(token).then((user) => {
        postService.getById(postId).then((post) => {
            if (user.name != post.author) {
                res.redirect('/user/login');
            } else {
                res.render('edit', { post: post, username: user.name });
            }
        });
    }).catch(() => {
        res.redirect('/user/login');
    })
}

//save changes to a post (if user is original author of post)
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
        res.redirect('/user/login');
    })
}

//delete post (if user is original author of post)
const deletePost = function (req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    const postId = req.params.postId;
    const author = req.body.username;

    userService.getUserByToken(token).then((user) => {
        if (user.name === author) {
            postService.deletePost(postId).then(() => {
                res.redirect('/user/' + user.name);
            })
        } else {
            res.redirect(403, '/home');
        }
    }).catch(() => {
        res.redirect('/user/login');
    })
}

module.exports = {
    getPost,
    updateLikes,
    getCreatePost,
    createPost,
    getEdit,
    updatePost,
    deletePost
};