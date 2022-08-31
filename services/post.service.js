const Post = require('../models/Post');

const getPostsByFollowing = async function (userArray) {
    const posts = await Post.find({ author: { $in: userArray } });
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

module.exports = {
    getPostsByFollowing
};