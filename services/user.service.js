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
    const token = JsonWebToken.sign({id: savedUser._id, email: savedUser.email}, JWT_CODE);
    return token;
}

const findAll = async function() {
    return await User.find();
}

module.exports = {
    saveUser,
    findAll
};