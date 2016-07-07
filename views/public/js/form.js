// document.getElementById("form").addEventListener("submit", function() {
//     document.getElementById("content").value = marked(document.getElementById("content").value);
// });

function onSub() {
    document.getElementById("contentHidden").value =  
        document.getElementById("content").innerHTML;
    return true;
}
