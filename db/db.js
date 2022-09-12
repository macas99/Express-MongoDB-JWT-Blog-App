const mongoose = require("mongoose");
const {db} = require('../config/config');

mongoose.Promise = global.Promise;
mongoose.connect(db);

mongoose.connection
    .once('open', res => console.log('Connected to the database'))
    .on('error', err => console.log('Error connecting to database'));
    