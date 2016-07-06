var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(express.bodyParser());
app.use(express.static(__dirname + '/views/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get('/form', function(req, res) {
   res.sendFile(path.join(__dirname + "/views/form/form.html")); 
});

app.listen(process.env.PORT, function (req, res) {
    console.log("Log is Listening");
});