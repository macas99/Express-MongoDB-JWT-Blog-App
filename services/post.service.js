const Post = require('../models/Post');

const getPostsByFollowing = async function (userArray) {
    const posts = await Post.find( { author: { $in: userArray } } );
    return posts;
}

module.exports = {
    getPostsByFollowing
};