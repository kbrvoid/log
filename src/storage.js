var dblite = require('dblite');
var db = dblite('database.sqlite');
// var id;
var model;

var init = function() {
    db.query('CREATE TABLE IF NOT EXISTS logs (id TEXT, title TEXT, content TEXT)');
}

var generateId = () => [1, 1, 1, 1, 1, 1, 1]
  .map(() => {
    var code = Math.floor(Math.random() * 36);
    return String.fromCharCode(code + (code < 10 ? 48 : 87));
  })
  .join("");
  
// var getFreeId = () => {
//   id = generateId();
//   return getLog(id) === undefined ? id : getFreeId();
// };


var addLog = function(id, title, content) {
db.query(
  'INSERT INTO logs VALUES (:id, :title, :content)',
  {
    id: id,
    title: title,
    content: content
  }
);
}

var getLog = function(id) {
    db.query(
        'SELECT * FROM logs WHERE id = ?',
        [id],
        function (rows) {
            var row = row[0];
            model = {title:row[1], content: row[2]};
            // console.log(model);
        }
    );
    return model;
}

var getTitle = function(id) {
    var tLog = getLog(id);
    return tLog.title;
}

var getContent = function(id) {
    var cLog = getLog(id);
    return cLog.content;
}



module.exports.getLog = getLog;
module.exports.init = init;
module.exports.addLog = addLog;
module.exports.getTitle = getTitle;
module.exports.getContent = getContent;
module.exports.generateId = generateId;