// document.getElementById("form").addEventListener("submit", function() {
//     document.getElementById("content").value = marked(document.getElementById("content").value);
// });

// function onSub() {
//     document.getElementById("contentHidden").value =  
//         document.getElementById("content").innerHTML;
//     return true;
// }

var textarea = document.getElementById('content');

textarea.addEventListener('keydown', autosize);
             
function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}