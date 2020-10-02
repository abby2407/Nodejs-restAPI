const express = require('express');
const fs  = require("fs");
const bodyParser = require("body-parser");

global.__basedir = __dirname;

let upload = require('./config/multer');
const csvController= require('./controllers/csv.controller.js');
let db = require("./config/db");



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('resources'));

let path = __basedir + '/views/';


/* db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
  }); */ 

app.get("/", (req, res) => {
    res.sendFile(path + "index.html");
});

app.post('/api/file/upload', upload.single("file"), csvController.uploadFile);

app.listen(3000, function () {
    console.log("Server started Successfully");
});