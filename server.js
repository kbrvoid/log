var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var storage = require('./src/storage');
var view = require('./src/view');
var color = require("./extra/color");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views/public'));


var log = function () {
  var date = new Date();
  var timestamp = date.getDate() + "/" + date.getMonth() + " " + date.getHours() + ":" +
    date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
  var message = Array.prototype.slice.call(arguments);
  message.unshift("--");
  message.unshift(timestamp);
  console.log.apply(console, message);
}

var notFound = res => res.send(`<h1>404</h1><br><span style='font-size: 3vh'>Not Found</span>`);



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/views/index.html"));
    log(color.green("User with IP: '" + req.ip + "' Just Visited Log"));
});

app.get('/form', function(req, res) {
   res.sendFile(path.join(__dirname + "/views/form/form.html"));
   log(color.green("User is on the Form"));
});

app.post('/new', function(req, res) {
   var body = req.body,
       title = body.title,
       content = body.content,
       redirectToLog = log => res.redirect("/" + log.id);
    storage.addLog(title, content).then(redirectToLog);
    log(color.blue("User posted to /new"));
});

app.get(/\/([a-z0-9]+)/, function(req, res) {
    var urlId = req.params["0"];
    res.set('Content-Type', 'text/html');
    storage.getLog(urlId).then(currentLog => {
        if(!currentLog) {
            notFound(res);
        }
        var html = view.render(currentLog.id, currentLog.title, currentLog.content);
        res.send(new Buffer(html));
        log(color.green("User visited '/" + urlId + "'"));
    });
});

app.get(/\/([a-z0-9]+\/raw)/, function(req, res) {
    var urlId = req.params["0"].replace("/raw", "");
    res.set('Content-Type', 'text/plain');
    storage.getLog(urlId).then(currentLog => {
        if(!currentLog) {
            notFound(res);
        }
        var html = view.render(currentLog.id, currentLog.title, currentLog.content);
        res.send(new Buffer(html));
        log(color.green("User visited '/" + urlId + "' [RAW]"));
    });
});

app.listen(process.env.PORT, function (req, res) {
    console.log("Log is Listening");
});
