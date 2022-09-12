const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./db/db');

const routes = require('./routes/index.route');
app.use(routes);

const { port } = require('./config/config');
app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});