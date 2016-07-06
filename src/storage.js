var dblite = require('dblite');
var db = dblite('database.sqlite');
var id = "lol";
var model;

module.exports.init = function() {
    db.query('CREATE TABLE IF NOT EXISTS logs (id TEXT, title TEXT, content TEXT)');
}

module.exports.addLog = function(title, content) {
db.query(
  'INSERT INTO logs VALUES (:id, :title, :content)',
  {
    id: id,
    title: title,
    content: content
  }
);
}

module.exports.getLog = function(id) {
    db.query(
        'SELECT * FROM logs WHERE id = ?',
        [id],
        function (rows) {
            model = {title:rows[0][1], content: rows[0][2]};
            // console.log(model);
            return model;
        }
    )
}