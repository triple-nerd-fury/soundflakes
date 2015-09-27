var drawLineTimers = []; // Array of timers.
var branches = []; // Array of branches

var newBranch = function( origin, direction ) { // Two objects that contain x and y coords
  var path = new paper.Path();
  path.strokeColor = 'black';
  var start = new paper.Point( origin.x, origin.y );  
  path.moveTo(start);

  var branch = {
    path: path,
    start: start,
    direction: direction
  }

  branches.push(branch);
};

var drawLine = function() {
  var durationLine = {
    x: 0,
    y: 0,
  };

  newBranch( durationLine, { x: 1, y: 1 } );
  newBranch( durationLine, { x: 3, y: 2 } );
  newBranch( durationLine, { x: 3, y: 4 } );

  var drawLineTimer = setInterval( function() {
    for ( x = 0; x < branches.length; x++ ) {
      branches[x].path.lineTo(branches[x].start.add(branches[x].direction));
      branches[x].start = branches[x].start.add(branches[x].direction);
    }
    paper.view.draw();
  }, 50);

  drawLineTimers.push(drawLineTimer);
};

var clickedFlag = false;

var branchListener = function() {
  if (clickedFlag) {
    return true;
  }
  return false;
};

$(document).ready(function() {
  console.log("Document Ready!");
  
$("#myCanvas").on('click', function() {
  console.log("clicked!");
  if (clickedFlag) {
    clickedFlag = false;
  } else {
    clickedFlag = true;
  }
});


  paper.install(window);

  window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    paper.setup(canvas);  // Sets up a PaperScope, initializes an empty project and a view.

    // var path = new paper.Path(); // Creates a Path to draw a line
    // path.strokeColor = 'black'; // Gives the stroke of the line a black color

    // var start = new paper.Point(100, 100); // Sets a point with coordinates 100,100 as a variable 'start'

    // path.moveTo(start); // Move to the specified point and draw a line from here
    // path.lineTo(start.add([ 200, -50 ]));  // Add 200 to x and -50 to Y
    // start = start.add([200, -50]); // Set new point
    // path.lineTo(start.add([ 150, -10 ]));  // Add 150 to x and -10 to Y
    // start = start.add([150, -10]); // Set new point
    // path.lineTo(start.add([300, 100]));
    // start = start.add([300, 100]); // set new point

    // paper.view.draw(); // Render what we've document

    drawLine();

  };

});