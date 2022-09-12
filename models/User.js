const mongoose = require('mongoose');
const { users } = require('../db/data');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, unique: true, trim: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  followers: [String],
  following: [String]
})

//insert dummy data on app start
async function mySeeder() {
  const User = mongoose.model('user', userSchema);
  const data = await User.find({}).exec();
  if (data.length !== 0) {
    return;
  }
  await User.collection.insertMany(users);
}

mySeeder();
module.exports = mongoose.model('user', userSchema);