const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blogDB");

mongoose.connection
    .once('open', res => console.log('Connected to the database'))
    .on('error', err => console.log('Error connecting to database'));
    