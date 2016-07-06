var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var storage = require('./src/storage');
var view = require('./src/view');
var fs = require('fs');
var template = fs.readFileSync("./views/template/template.html", "utf-8");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views/public'));

storage.init();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get('/form', function(req, res) {
   res.sendFile(path.join(__dirname + "/views/form/form.html")); 
});

app.post('/new', function(req, res) {
   var body = req.body,
       title = body.title,
       content = body.content,
       id = storage.generateId();
    storage.addLog(id, title, content);
    res.redirect("/" + id);
});

app.get("/:id", function(req, res) {
    var urlId = req.params["id"];
    var log = storage.getLog(urlId);
    console.log(log);
    // var content = view.render(log.title, log.content);
    res.set('Content-Type', 'text/html');
    res.send(new Buffer(template.replace(/{{title}}/g, storage.getTitle(urlId)).replace(/{{content}}/g, storage.getContent(urlId))));
});

app.listen(process.env.PORT, function (req, res) {
    console.log("Log is Listening");
});
