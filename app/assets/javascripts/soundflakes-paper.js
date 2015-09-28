var renderTimers = []; // Array of timers.
var branches = []; // Array of branches
var branchLimit = 5;
var branchMaxSpeed = 0.3;
var renderTimer = null;

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
    if ( branchListener() ) {
      clickedFlag = false;
      for( x = 0; x < branchLimit; x++ ) {
        var index = Math.floor(Math.random() * branches.length);
        if ( branches[index] ) {
          var randomX = (Math.random() * (branchMaxSpeed * 2)) - (branchMaxSpeed);
          var randomY = (Math.random() * (branchMaxSpeed * 2)) - (branchMaxSpeed);
          newBranch( { x: branches[index].location.x, y: branches[index].location.y }, { x: randomX, y: randomY } );
        }
      }
    }
  };

  this.move = function() {
    var newLocation = this.location.add(this.direction);
    this.path.lineTo(newLocation);
    this.location = newLocation;
    this.listenForClick();
  };
}

var newBranch = function( origin, direction ) { // Two objects that contain x and y coords
  var path = new paper.Path();
  var color = '#' + ( function co(lor) { return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (lor.length == 6) ?  lor : co(lor); })('');
  path.strokeColor = color;
  var start = new paper.Point( origin.x, origin.y );  
  path.moveTo(start);

  var newBranch = new Branch( path, start, direction );
  branches.push(newBranch);
};

var init = function() { // Initializes starting points/branches
  var durationLine = { x: 300, y: 300 };
  newBranch( durationLine, { x: 0.1, y: 0.1 } );

  renderLines();
};

var renderLines = function() {

  renderTimer = setInterval( function() {
    for ( x = 0; x < branches.length; x++ ) {
      var newLocation = branches[x].location.add(branches[x].direction);
      branches[x].move();
    }
    paper.view.draw();
  }, 50);

  renderTimers.push(renderTimer);
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
