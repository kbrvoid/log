var fs = require('fs');

var template = fs.readFileSync("./views/template/template.html", "utf-8");

var render = function(title, content) {
    return template.replace(/{{title}}/g, title)
                   .replace(/{{content}}/g, content);
}

module.exports.render = render;