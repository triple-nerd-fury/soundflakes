var app = app || {};

var throttledGenerate;
var branchMaxSpeed = 0.1;
var branchAmount = 5;

var Branch = function( path, origin, direction ) {
  this.path = path;
  this.location = origin;
  this.direction = direction;

  this.move = function(fbc_array) {
    var newLocation = this.location.add(this.direction);
    this.path.lineTo(newLocation);
    this.location = newLocation;
   
    this.checkFbc(fbc_array);
    this.checkLimits();
  };

  this.generateNewBranches = function() {  
  	for ( x = 0; x < branchAmount; x++ ) {
      var index = Math.floor(Math.random() * app.snowFlakeView.branches.length); // select random branch from available branches
      if ( app.snowFlakeView.branches[index] ) { // if branch exists in random index
    		var newOrigin = {
	  			x: app.snowFlakeView.branches[index].location.x,
	  			y: app.snowFlakeView.branches[index].location.y
	  		};
	  		var newDirection = {
	  			x: (Math.random() * 0.6) - 0.3,
	  			y: (Math.random() * 0.6) - 0.3
	  		};
	  		app.snowFlakeView.newBranch( newOrigin, newDirection );
      }
    }
  };

  if ( !throttledGenerate ) { throttledGenerate = _.throttle( this.generateNewBranches, 5000 ); }

  this.checkFbc = function(fbc_array) {
  	var total = 0;
  	for ( var x = 0; x < fbc_array.length; x++ ) {
  		total += fbc_array[x];
  	}
  	total = total / fbc_array.length;

  	if ( total > 60 ) { 
  		throttledGenerate();
  	}
  };

  this.checkLimits = function() {
  	var xLimit = $('#analyser_render').width();
	  var yLimit = $('#analyser_render').height();
  	if ( this.location.x <= 0 || this.location.y <= 0 || this.location.x >= xLimit || this.location.y >= yLimit) {
  		this.direction.x = 0;
  		this.direction.y = 0;
  	}
  };
}

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

	  var startX = $('#analyser_render').width() / 2;
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
	   	this.onFrame();
   }
	},

	onFrame: function(event) {
		for ( x = 0; x < this.branches.length; x++ ) {
    	this.branches[x].path.strokeColor.hue += 1;

    }
	},

	startMusic: function() {
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
