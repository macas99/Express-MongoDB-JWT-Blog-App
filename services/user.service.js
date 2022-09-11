const Bcrypt = require('bcryptjs');
const JsonWebToken = require("jsonwebtoken");
const User = require('../models/User');
const JWT_CODE = "geheim";


const saveUser = async function (name, email, password) {
    const user = new User({
        name: name,
        email: email,
        password: Bcrypt.hashSync(password, 10)
    });

    const savedUser = await user.save();
    const token = JsonWebToken.sign({ username: savedUser.name }, JWT_CODE);
    return token;
}

const getUserByToken = async function (token) {
    const decoded = JSON.stringify(JsonWebToken.verify(token, JWT_CODE));
    const username = JSON.parse(decoded).username;
    return await User.findOne({ name: username });
}

const verifyPassword = async function (username, password) {
    const user = await User.findOne({ name: username });
    return user ? Bcrypt.compareSync(password, user.password) : false;
}

const findAll = async function () {
    return await User.find();
}

const createUserToken = function (username) {
    const token = JsonWebToken.sign({ username: username }, JWT_CODE);
    return token;
}

const getUserByName = async function (username) {
    return await User.findOne({ name: username });
}

const updateFollow = async function (user, profile, follow) {
    return await follow ? addFollow(user, profile) : deleteFollow(user, profile);
}

//add new follower to account
const addFollow = async function (user, profile) {
    User.updateOne({ name: profile }, { $push: { followers: user } }).then(() => {
        addToFollowing(user, profile);
    });
}

//add account to following list of user
const addToFollowing = async function (user, profile) {
    return await User.updateOne({ name: user }, { $push: { following: profile } });
}

//delete follower from account
const deleteFollow = async function (user, profile) {
    User.updateOne({ name: profile }, { $pull: { followers: user } }).then(() => {
        deleteFromFollowing(user, profile)
    });
}

//remove account from following list of user 
const deleteFromFollowing = async function (user, profile) {
    return await User.updateOne({ name: user }, { $pull: { following: profile } });
}

//find users whose username includes query
const searchUser = async function (query) {
    return await User.find({ name: { $regex: query, $options: 'i' } });
}

//unfollow all - used when account is deleted
const unfollowAll = async function (user) {
    User.updateMany({}, { $pull: { followers: user } }).then(() => {
        removeFollowing(user);
    });
}

const removeFollowing = async function (user) {
    return await User.updateMany({}, { $pull: { following: user } });
}

const deleteUser = async function (user) {
    return await User.deleteOne({ name: user });
}

module.exports = {
    saveUser,
    getUserByToken,
    verifyPassword,
    findAll,
    createUserToken,
    getUserByName,
    updateFollow,
    searchUser,
    unfollowAll,
    deleteUser
};