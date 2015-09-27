var drawLineTimers = []; // Array of timers.
var branches = []; // Array of branches

// CLICK EVENT
var clickedFlag = false;
var branchListener = function() {
  if (clickedFlag) {
    return true;
  }
  return false;
};

var Branch = function( path, origin, direction ) {
  this.path = path;
  this.location = origin;
  this.direction = direction;

  this.listenForClick = function() {
    console.log("ListenToClick");
  };
}

var newBranch = function( origin, direction ) { // Two objects that contain x and y coords
  var path = new paper.Path();
  path.strokeColor = 'black';
  var start = new paper.Point( origin.x, origin.y );  
  path.moveTo(start);

  var newBranch = new Branch( path, start, direction );
  branches.push(newBranch);
  console.log(branches);
};

var init = function() { // Initializes starting points/branches
  var durationLine = { x: 0, y: 0 };
  newBranch( durationLine, { x: 1, y: 1 } );

  renderLines();
};

var renderLines = function() {

  var drawLineTimer = setInterval( function() {
    for ( x = 0; x < branches.length; x++ ) {
      var newLocation = branches[x].location.add(branches[x].direction);
      branches[x].path.lineTo(newLocation);
      branches[x].location = newLocation;
      branches[x].listenForClick();

      if ( branchListener() ) {
        var randomX = Math.floor(Math.random() * 4) - 2;
        var randomY = Math.floor(Math.random() * 4) - 2;
        newBranch( { x: branches[x].location.x, y: branches[x].location.y }, { x: randomX, y: randomY } );
        clickedFlag = false;
      }
    }
    paper.view.draw();
  }, 50);

  drawLineTimers.push(drawLineTimer);
};

$(document).ready(function() {
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
    init();
  };
});

