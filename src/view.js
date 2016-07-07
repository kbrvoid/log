var fs = require('fs');

var template = fs.readFileSync("./views/template/template.html", "utf-8");

var render = function(id, title, content) {
    return template.replace("/{{id}}/g", id)
                   .replace(/{{title}}/g, title)
                   .replace(/{{content}}/g, content);
}

module.exports.render = render;