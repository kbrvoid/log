var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  storage: 'database.sqlite'
});

var Log = sequelize.define('Log', {
    id: { type: Sequelize.STRING(7), unique: true, primaryKey: true },
    title: Sequelize.TEXT,
    content: Sequelize.TEXT 
});

sequelize.sync();


var generateId = () => [1, 1, 1, 1, 1, 1, 1]
    .map(() => {
        var code = Math.floor(Math.random() * 36);
        return String.fromCharCode(code + (code < 10 ? 48 : 87));
    })
    .join("");

var getFreeId = () => {
    var id = generateId();
    return Log.findById(id).then(result => result ? getFreeId() : id);
};


module.exports.getLog = function(id) {
    return Log.findById(id);
}

module.exports.addLog = (title, content) => getFreeId().then(id => Log.create({
    id: id,
    title: title,
    content: content
}));