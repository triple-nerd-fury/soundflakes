var app = app || {};

// var clickedFlag = false;
// var branchListener = function() {
//   if (clickedFlag) {
//     return true;
//   }
//   return false;
// };

var Branch = function( path, origin, direction ) {
  this.path = path;
  this.location = origin;
  this.direction = direction;

  // this.listenForClick = function() {
  //   if ( branchListener() ) {
  //     clickedFlag = false;
  //     for( x = 0; x < branchLimit; x++ ) {
  //       var index = Math.floor(Math.random() * branches.length);
  //       if ( branches[index] ) {
  //         var randomX = (Math.random() * (branchMaxSpeed * 2)) - (branchMaxSpeed);
  //         var randomY = (Math.random() * (branchMaxSpeed * 2)) - (branchMaxSpeed);
  //         newBranch( { x: branches[index].location.x, y: branches[index].location.y }, { x: randomX, y: randomY } );
  //       }
  //     }
  //   }
  // };

  this.move = function() {
    var newLocation = this.location.add(this.direction);
    this.path.lineTo(newLocation);
    this.location = newLocation;
    // this.listenForClick();
  };
}

app.SnowFlakeView = Backbone.View.extend({
	el: '#main',
	branchSpeed: 0.1,

	initialize: function( track ) {
		this.track = track;
		this.branches = []; // Array of branches
		this.renderTimers = []; // Array of timers.
		// this.renderTimer = null;
	},

	render: function() {
		var snowflakeTemplate = $('#snowflakeTemplate').html();
		this.$el.html( snowflakeTemplate );
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

	// renderLines: function() {
	// 	var intervalID = this.renderTimer();
	// 	this.renderTimers.push(this.renderTimer());
	// },

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

	  var durationLine = { x: 300, y: 300 };
		this.newBranch( durationLine, { x: 0, y: this.branchSpeed } );
		this.newBranch( durationLine, { x: this.branchSpeed, y: 0 } );
		this.newBranch( durationLine, { x: -(this.branchSpeed), y: 0 } );
		this.newBranch( durationLine, { x: 0, y: -(this.branchSpeed) } );

		// this.renderLines();

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
	    	this.branches[x].move();
	    }
	   	paper.view.draw();
   }
	},

	// renderTimer: function() {
	// 	var view = this;
	// 	var interval = setInterval( function() {
	//     for ( x = 0; x < view.branches.length; x++ ) {
	//     	var newLocation = view.branches[x].location.add(view.branches[x].direction);
	//     	// debugger;
	//     	view.branches[x].move();
	//     }
	//    	paper.view.draw();
 // 		}, 50);
 // 		return interval;
 // 	},

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





		// var Branch = function( path, origin, direction ) {
  // 		this.path = path;
  // 		this.location = origin;
 	//  		this.direction = direction;
		// };
