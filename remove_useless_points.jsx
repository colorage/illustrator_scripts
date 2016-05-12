var myDoc = app.activeDocument;
var length = myDoc.pathItems.length;
var count = 0;
for (var i=0; i<length; i++){
   if (isShape (myDoc.pathItems[i]) && myDoc.pathItems[i].closed && myDoc.pathItems[i].editable){
    var pointsLength= myDoc.pathItems[i].pathPoints.length;
    var myPathPoints = myDoc.pathItems[i].pathPoints;
        for(var j=0;j<pointsLength;j++){
            var dot = j;
            var dot_prev = dot -1;
            var dot_next = dot+1;
            if (dot_prev == -1){
                dot_prev = pointsLength -1;
            }
            if (dot_next == pointsLength){
                dot_next = 0;
            }
            if (isOnLine (myPathPoints[dot], myPathPoints[dot_next], myPathPoints[dot_prev])){
                myPathPoints[dot].remove();
                ++count;
                --pointsLength;
                --j;
            }
        }
   }
    // for open path
    if (isShape (myDoc.pathItems[i]) && !myDoc.pathItems[i].closed && myDoc.pathItems[i].editable){
    var pointsLength= myDoc.pathItems[i].pathPoints.length;
    var myPathPoints = myDoc.pathItems[i].pathPoints;
        for(var j=1;j<pointsLength-1;j++){
            var dot = j;
            var dot_prev = dot -1;
            var dot_next = dot+1;
            if (dot_prev == -1){
                dot_prev = pointsLength -1;
            }
            if (dot_next == pointsLength){
                dot_next = 0;
            }
            if (isOnLine (myPathPoints[dot], myPathPoints[dot_next], myPathPoints[dot_prev])){
                myPathPoints[dot].remove();
                ++count;
                --pointsLength;
                --j;
            }
        }
   }
}
alert (count + " dots were deleted");


function isCorner(currentPathPoint){
    var ax = currentPathPoint.anchor[0];
    var ay = currentPathPoint.anchor[1];
    var lx = currentPathPoint.leftDirection[0];
    var ly = currentPathPoint.rightDirection[1];
    var rx = currentPathPoint.leftDirection[0];
    var ry = currentPathPoint.rightDirection[1];
    var xcheck = (ax-lx) + (ax-rx) + (lx-rx);
    var ycheck = (ay-ly) + (ay-ry) + (ly-ry);
    if ((xcheck == 0) && (ycheck==0)){
        return   true;
    }
    else {
        return false;
    }
 }

function isShape(currentPathItem){
    if (currentPathItem.pathPoints.length >2){
        return true;
    }
    else {
        return false;
    }
}

function isOnLine(pathPoint, pathPoint_next, pathPoint_prev){
    var x = pathPoint.anchor[0];
    var y = pathPoint.anchor[1];
    var x1 = pathPoint_next.anchor[0];
    var y1 = pathPoint_next.anchor[1];
    var x2 = pathPoint_prev.anchor[0];
    var y2 = pathPoint_prev.anchor[1];
    var d1 = distance (x1, y1, x2, y2);
    var d2 = distance (x, y, x1, y1)+distance (x, y, x2, y2);
    if (Math.abs (d2-d1)==0){
        return true;
    }
    else {
        return false;
    }
}

function distance(x1,y1, x2, y2){
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx*dx + dy*dy);
}
