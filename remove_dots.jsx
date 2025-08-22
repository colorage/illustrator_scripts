var myDoc = app.activeDocument;
var length = myDoc.pathItems.length;
var count = 0;
for (var i=length-1; i>=0; i--){
    var pathItem = myDoc.pathItems[i];
    if (!pathItem.locked && !pathItem.hidden && pathItem.pathPoints.length == 0){
        pathItem.remove();
        ++count;
    }
}
alert(count + " paths were deleted");
