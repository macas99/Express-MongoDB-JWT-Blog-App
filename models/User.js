const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, unique: true, trim: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  followers: [String],
  following: [String]
})

module.exports = mongoose.model('user', userSchema);