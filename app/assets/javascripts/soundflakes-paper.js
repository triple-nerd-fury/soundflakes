

var drawLine = function() {
  var path = new paper.Path();
  path.strokeColor = 'black';

  var start = new paper.Point(100, 100); 
  path.moveTo(start);
  var X = 10;
  var Y = 10;

  var drawLineTimer = setInterval( function() {
    if ( branchListener() ) {
      X = (Math.random() * (21)) - 10;
      Y = (Math.random() * (21)) - 10;
      path.lineTo(start.add([ X, Y ]));
      start = start.add([ X, Y ]);
      clickedFlag = false;
    } else {
      path.lineTo(start.add([ X, Y ]));
      start = start.add([ X, Y]);
    }
    paper.view.draw();
  }, 50);
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