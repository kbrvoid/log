var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var storage = require('./src/storage');
var view = require('./src/view');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views/public'));

storage.init();

var log = function () {
  var date = new Date();
  var timestamp = date.getDate() + "/" + date.getMonth() + " " + date.getHours() + ":" +
    date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
  var message = Array.prototype.slice.call(arguments);
  message.unshift("--");
  message.unshift(timestamp);
  console.log.apply(console, message);
}


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/views/index.html"));
    log("User with IP: '" + req.ip + "' Just Visited Log")
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

app.get(/\/([a-z0-9]+)/, function(req, res) {
    var urlId = req.params["0"];
    res.set('Content-Type', 'text/html');
    var log = storage.getLog(urlId);
    res.send(new Buffer(view.render(log.title, log.content)));
});

app.listen(process.env.PORT, function (req, res) {
    console.log("Log is Listening");
});
