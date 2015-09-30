var app = app || {};

var throttledGenerate;

// var clickedFlag = false;
// var branchListener = function() {
//   if (clickedFlag) {
//     return true;
//   }
//   return false;
// };

var branchMaxSpeed = 0.01;
var lastShortAvg = 0;
var lastLongAvg = 0;
var avg = 0;
var historyArray = [];
var longHistoryArray =[];
var count = 0;

var Branch = function( path, origin, direction ) {
  this.path = path;
  this.location = origin;
  this.direction = direction;

  // this.listenForClick = function() {
  //   clickedFlag = false;
  //   for( x = 0; x < 5; x++ ) {
  //     var index = Math.floor(Math.random() * app.snowFlakeView.branches.length);
  //     if ( app.snowFlakeView.branches[index] ) { // if branch exists in random index
  //       var randomX = (Math.random() * (branchMaxSpeed * 2)) - (branchMaxSpeed);
  //       var randomY = (Math.random() * (branchMaxSpeed * 2)) - (branchMaxSpeed);
  //       app.snowFlakeView.newBranch( { x: app.snowFlakeView.branches[index].location.x, y: app.snowFlakeView.branches[index].location.y }, { x: randomX, y: randomY } );
  //     }
		// }
  // };

  this.move = function(fbc_array) {
    var newLocation = this.location.add(this.direction);
    this.path.lineTo(newLocation);
    this.location = newLocation;
    
    this.checkFbc(fbc_array);
  };

  this.generateNewBranches = function() {  
  	console.log("Branch Generated");
  	for( x = 0; x < 1; x++ ) {
      // var index = Math.floor(Math.random() * app.snowFlakeView.branches.length);
      // if ( app.snowFlakeView.branches[index] ) { // if branch exists in random index
        // var randomX = (Math.random() * (branchMaxSpeed * 2)) - (branchMaxSpeed);
        // var randomY = (Math.random() * (branchMaxSpeed * 2)) - (branchMaxSpeed);
        // app.snowFlakeView.newBranch( { x: app.snowFlakeView.branches[index].location.x, y: app.snowFlakeView.branches[index].location.y }, { x: randomX, y: randomY } );

    		var newOrigin = {
	  			x: app.snowFlakeView.branches[0].location.x,
	  			y: app.snowFlakeView.branches[0].location.y
	  		};

	  		var newDirection = {
	  			x: (Math.random() * 0.6) - 0.3,
	  			y: (Math.random() * 0.6) - 0.3
	  		};
	  		app.snowFlakeView.newBranch( newOrigin, newDirection );
      }
    // }
  };

  if ( !throttledGenerate ) { throttledGenerate = _.throttle( this.generateNewBranches, 1000 ); }

  this.checkFbc = function(fbc_array) {
  	var total = 0;
  	for ( var x = 0; x < fbc_array.length; x++ ) {
  		total += fbc_array[x];
  	}

  	total = total / fbc_array.length;
    lastShortAvg = (5 * lastShortAvg + total)/6
   
    // if (count > 100) {
    //   var compare = lastShortAvg/lastLongAvg
    //   if (compare > 1.3) {   
    //     console.log(compare)
    //   }
    // } 

    lastLongAvg = (29 * lastLongAvg + total)/30

   var compareThis = total/avg

     if ( compareThis > 2 ) { 
     throttledGenerate();
    }

     historyArray.push(total)

    if (count % 100 == 0) {
      longHistoryArray.push(historyArray)
      }
      if (historyArray.length > 100) {
      historyArray.shift();
    }
  } 

  if (longHistoryArray.length > 1000) {
    longHistoryArray.shift();
  } 
  //  if (count % 1000 == 0) {
  //   superLongHistoryArray.push(longHistoryArray);
  // } 

    // avg = total
    count += 1
    var shortHistory = 0;
    for (i = 0; i < historyArray.length; i++) {
      shortHistory += historyArray[i];
    }
     console.log('short' + shortHistory/historyArray.length )

     var longHistory = 0;
    for (i = 0; i < longHistoryArray.length; i++) {
      for (j = 0; j < longHistoryArray[i].length; j++){
      longHistory += longHistoryArray[i][j];
      }
    }
     console.log('long' + longHistory)
   
  };

// }

app.SnowFlakeView = Backbone.View.extend({
	el: '#main',
	branchSpeed: 0.1,

	initialize: function( track ) {
		this.track = track;
		this.branches = []; // Array of branches
	},

	render: function() {
		var snowflakeTemplate = $('#snowflakeTemplate').html();
		this.$el.html( snowflakeTemplate );

	  $("#analyser_render").on('click', function() {
	    console.log("clicked!");
	    if (clickedFlag) {
	      clickedFlag = false;
	    } else {
	      clickedFlag = true;
	    }
	  });

		this.startMusic();
	},


	newBranch: function( origin, direction ) { // Two objects that contain x and y coords
		  var path = new paper.Path();
		  var color = '#' + ( function co(lor) { return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (lor.length == 6) ?  lor : co(lor); })('');
		  path.strokeColor = color;
		  var start = new paper.Point( origin.x, origin.y );  
		  path.moveTo(start);

	  var newBranch = new Branch( path, start, direction );
	  this.branches.push(newBranch);
		},

	initMp3Player: function() {
	  document.getElementById('audio_box').appendChild(this.audio);
	  this.context = new AudioContext(); // AudioContext object instance
	  this.analyser = this.context.createAnalyser(); // AnalyserNote method
	  this.analyser.maxDecibels = -10;
	  this.analyser.minDecibels = -100;
	  this.canvas = document.getElementById('analyser_render');
	  this.ctx = this.canvas.getContext('2d');
	  paper.setup(this.canvas);  // Sets up a PaperScope, initializes an empty project and a view.
	  // Re-route audio playback into the processing graph of the audio context
	  this.source = this.context.createMediaElementSource(this.audio);
	  this.source.connect(this.analyser);
	  this.analyser.connect(this.context.destination);

    // var startX = $('#analyser_render').width() / 2;
	  var startX = 0;
	  var startY = $('#analyser_render').height() / 2;

	  var durationLine = { x: startX, y: startY };
		this.newBranch( durationLine, { x: this.branchSpeed, y: 0 } );

		this.frameLooper();
	},

	frameLooper: function() {
		// debugger;
		
			window.requestAnimationFrame( this.frameLooper.bind(this) );
		  
		  this.fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
		  this.analyser.getByteFrequencyData(this.fbc_array);
		  // console.log(this.context.currentTime)
		  // ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
		  // ctx.fillStyle = '#00CCFF'; // Color of the bars
		  // bars = 1024;
		  // for (var i = 0; i < bars; i++) {
		  //   bar_x = i;
		  //   bar_width = 1;
		  //   bar_height = -(fbc_array[i]);
		  //   //  fillRect( x, y, width, height ) // Explanation of the parameters below
		  //   ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
		  // }
	if (!app.snowFlakeView.audio.paused) {
	    for ( x = 0; x < this.branches.length; x++ ) {
	    	var newLocation = this.branches[x].location.add(this.branches[x].direction);
	    	this.branches[x].move(this.fbc_array);

	    	// this.branches[x].listenForClick();
	    }
	   	paper.view.draw();
   }
	},

	startMusic: function() {
		// var trackURL = "<%= @track_stream %>";
		this.trackURL = this.track.stream_url + "?client_id=dea3c2dce5d40ad0ee8ef7c8275d8dd5";

	  this.audio = new Audio();
	  this.audio.src = this.trackURL;
	  this.audio.controls = true;
	  this.audio.loop = true;
	  this.audio.autoplay = true;
	  this.audio.crossOrigin="anonymous";

		  // Establish all variables that analyser will use
		// var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

		//Initialize the MP3 player after the page loads all of its HTML into the window
		this.initMp3Player();
	}

});
