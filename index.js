const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./db/db');

const routes = require('./routes/index.route');
app.use(routes);

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});