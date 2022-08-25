const User = require('../models/User');


const saveUser = async function(){
    const user01 = new User({
        name: "Test",
        email: "Test",
        password: "Test"
    });

    return await user01.save();
}

const findAll = async function() {
    return await User.find();
}

module.exports = {
    saveUser,
    findAll
};