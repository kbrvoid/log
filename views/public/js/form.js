// document.getElementById("form").addEventListener("submit", function() {
//     document.getElementById("content").value = marked(document.getElementById("content").value);
// });

// function onSub() {
//     document.getElementById("contentHidden").value =  
//         document.getElementById("content").innerHTML;
//     return true;
// }

(function(document) {

var flex = {
    tagName: 'TEXTAREA',
    attribute: 'autosize',
    buffer: 500,
    events: 'input propertychange change',
    adjust: function(el, shrunk) {
        var height = el.scrollHeight,
            style = el.style;
        if (height > el.offsetHeight - 2) {
            style.height = (height+flex.buffer) + 'px';
        } else if (!shrunk) {
            style.height = '';
            flex.adjust(el, true);
        }

        var width = el.scrollWidth;
        if (width > el.offsetWidth) {
            style.width = (width+flex.buffer) + 'px';
        } else if (!shrunk) {
            style.width = '';
            flex.adjust(el, true);
        }
    }
};
flex.events.split(' ').forEach(function(type) {
    document.addEventListener(type, function(e) {
        var el = e.target;
        if (el.tagName === flex.tagName && el.hasAttribute(flex.attribute)) {
            flex.adjust(el);
        }
    });
});

})(document);