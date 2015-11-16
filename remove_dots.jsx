var myDoc = app.activeDocument;
var length = myDoc.pathItems.length;
var count = 0;
for (var i=length-1; i>=0; i--){
    if (myDoc.pathItems[i].length == 0){
        myDoc.pathItems[i].remove();
        ++count;
     }
}
alert(count + " paths were deleted");
