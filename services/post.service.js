const Post = require('../models/Post');

const getPostsByFollowing = async function (userArray) {
    const posts = await Post.find({ author: { $in: userArray } });
    return sortByDate(posts);
}

const getPostsByAuthor = async function (author) {
    const posts = await Post.find({ author: author });
    return sortByDate(posts);
}

const sortByDate = function (posts) {
    posts.sort(function (a, b) {
        return stringToDate(b.date, b.time) - stringToDate(a.date, a.time);
    });
    return posts;
}

//cant parse DD/MM/YYYY format to Date()
const stringToDate = function (date, time) {
    const dateSplit = date.split("/");
    const dateObject = new Date(dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0] + "T" + time);
    return dateObject;
}

const getById = async function (id) {
    return await Post.findById(id);
}

const updateLikes = async function (user, post, remove) {
    return await remove ? removeLike(user, post) : addLike(user, post);
}

const addLike = async function (user, post) {
    return await Post.updateOne({ _id: post }, { $push: { likedBy: user }, $inc: { likes: 1 } });
}

const removeLike = async function (user, post) {
    return await Post.updateOne({ _id: post }, { $pull: { likedBy: user }, $inc: { likes: -1 } });
}

const savePost = async function (title, body, author) {
    const post = new Post({
        title: title,
        author: author,
        body: body
    });
    return await post.save();
}

const updatePost = async function (id, title, body) {
    return await Post.updateOne({ _id: id }, { $set: { title: title, body: body } });
}

const deletePost = async function (id) {
    return await Post.deleteOne({ _id: id });
}

//return all posts with titles that include query
const searchPostLike = async function (query) {
    return await Post.find({ title: { $regex: query, $options: 'i' } });
}

module.exports = {
    getPostsByFollowing,
    updateLikes,
    getById,
    getPostsByAuthor,
    savePost,
    updatePost,
    deletePost,
    searchPostLike
};