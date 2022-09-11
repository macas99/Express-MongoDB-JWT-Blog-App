const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const getDate = function () {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    let date = `${day}/${month}/${year}`;
    return date;
}

function getTime() {
    let today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;
    let time = `${hour}:${minute}`;
    return time;
}

const postSchema = new Schema({
    title: { type: String, trim: true, required: true },
    author: { type: String, trim: true, required: true },
    body: { type: String, trim: true, required: true },
    date: { type: String, default: getDate() },
    time: { type: String, default: getTime() },
    likedBy: [String]
})

module.exports = mongoose.model('post', postSchema);