var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var storage = require('./src/storage');
var view = require('./src/view');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get('/form', function(req, res) {
   res.sendFile(path.join(__dirname + "/views/form/form.html")); 
});

app.post('/new', function(req, res) {
   var body = req.body,
       title = body.title,
       content = body.content;
});

app.get('/:key', function(req, res) {
    
});

app.listen(process.env.PORT, function (req, res) {
    console.log("Log is Listening");
});