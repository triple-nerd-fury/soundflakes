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
var currentHighest = [];
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
  	// console.log("Branch Generated");
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

    if (!currentHighest.length){
      currentHighest.push(total)
    }

    if ((currentHighest[0] - 5) < total) {
      // app.myCircle.scale( 5 );
      currentHighest[0] = total
      // throttledGenerate();
    }
    // if ( Math.random() <= 0.5 ) {
    //   app.myCircle.scale( 2 );
    // } else {
    //   // debugger;
    //   app.myCircle.scale( 0.5 );
    // }

    // console.log(currentHighest)

 //    if (total > 70){
 //   console.log(total)
 // }
  //   lastShortAvg = (5 * lastShortAvg + total)/6
   
  //   // if (count > 100) {
  //   //   var compare = lastShortAvg/lastLongAvg
  //   //   if (compare > 1.3) {   
  //   //     console.log(compare)
  //   //   }
  //   // } 

  //   lastLongAvg = (29 * lastLongAvg + total)/30


     if ( total/avg > 1.3 ) { 
     throttledGenerate();
   // console.log(total/avg)
    }

     // historyArray.push(total)

  //   if (count % 100 == 0) {
  //     longHistoryArray.push(historyArray)
  //     }
  //     if (historyArray.length > 100) {
  //     historyArray.shift();
  //   }
   

  // if (longHistoryArray.length > 1000) {
  //   longHistoryArray.shift();
  // } 
  // //  if (count % 1000 == 0) {
  // //   superLongHistoryArray.push(longHistoryArray);
  // // } 

    avg = total
  //   count += 1
  //   var shortHistory = 0;
  //   for (i = 0; i < historyArray.length; i++) {
  //     shortHistory += historyArray[i];
  //   }
  //    console.log('short' + shortHistory/historyArray.length )

  //    var longHistory = 0;
  //   for (i = 0; i < longHistoryArray.length; i++) {
  //     for (j = 0; j < longHistoryArray[i].length; j++){
  //     longHistory += longHistoryArray[i][j];
  //     }
  //   }
  //    console.log('long' + longHistory)

    

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
	    // console.log("clicked!");
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

  drawInitialBeatCircle: function () {
    var centerHorizontal = parseInt( $("canvas").width() ) / 2;
    var centerVertical = parseInt( $("canvas").height() ) / 2;

    app.beatCircle = new Path.Circle({
        center: new Point( centerHorizontal, centerVertical ),
        radius: 35,
        fillColor: 'green',
        strokeColor: 'green'
    });

    paper.view.draw();
  },

  scaleBeatCircle: function ( number ) {
    if ( app.beatCircle ) {
      var desired  = number;
      var original = 1 / desired;
      var originalRadius = app.beatCircle.bounds.width / 2;
      var segmentsOfAnimation = ( desired - original ) / 20;

      console.log( "Desired Scale: ", desired );
      console.log( "Original Scale: ", original );
      console.log( "Segments of Animation: ", segmentsOfAnimation );
      var centerHorizontal = parseInt( $("canvas").width() ) / 2;
      var centerVertical = parseInt( $("canvas").height() ) / 2;

      var animationInterval = window.setInterval(function () {
        app.beatCircle.bounds.width = app.beatCircle.bounds.width * ( segmentsOfAnimation + 1 );
        app.beatCircle.bounds.height = app.beatCircle.bounds.height * ( segmentsOfAnimation + 1 ); 
        app.beatCircle.position = new Point( centerHorizontal, centerVertical );
        paper.view.draw();
      }, 100);

      window.setTimeout(function () {
        window.clearInterval( animationInterval );
        window.setTimeout( function () {
          app.beatCircle.bounds.width = originalRadius * 2;
          app.beatCircle.bounds.height = originalRadius * 2; 
          app.beatCircle.position = new Point( centerHorizontal, centerVertical );  

          paper.view.draw();
        }, 250);
      }, 2000);




      // for ( var i = 1; i < 20; i++ ) {
        // Immediately Invoked Function Expression (IIFE) - Douglas Crockford is the man
        // (function (i) {
        //   window.setTimeout(function () {
        //     app.beatCircle.bounds.width = app.beatCircle.bounds.width * ( segmentsOfAnimation + 1 );
        //     app.beatCircle.bounds.height = app.beatCircle.bounds.height * ( segmentsOfAnimation + 1 ); 
        //     app.beatCircle.position = new Point( centerHorizontal, centerVertical );
        //     paper.view.draw();
        //   }, 100);
        // })(i);
      // }
// 
      // app.beatCircle.scale( desired );
      // paper.view.draw();


      // Sort out the initial ratio
        // With number as the desired size increase
    }
  },

  plotIntensity: function() {
    // app.newPath = new Path();
    // app.start = new Point(50,100);
    // app.end = new Point(50, 500);
    // app.newPath.add(app.start);
    // app.newPath.add(app.end);
    // app.newPath.strokeColor = 'pink';

    if ( app.newPath ) {
      app.newPath.remove();
      app.newPath_two.remove();
      app.newPath_three.remove();
      app.newPath_four.remove();
    }
    var canvasHeight = $('canvas').height() / 2
    var canvasWidth = $('canvas').width()
    var segments = 100;
    var distance = canvasWidth / segments;

    var coordinates = [[0, canvasHeight]];
    var coordinates_two = [[0, canvasHeight]];
    var coordinates_three = [[0, canvasHeight]];
    var coordinates_four = [[0, canvasHeight]];

    for (var i = 5; i < segments - 5; i++) {
      var x = i * distance
      var y = canvasHeight + this.fbc_array[i];
      var arrayElement = [x,y]
      coordinates.push(arrayElement);
    }

    for (var i = 105; i < segments + 95; i++) {
      var x = (i - 100) * distance
      var y = canvasHeight + parseInt(  this.fbc_array[i] );
      var arrayElement = [x,y]
      coordinates_two.push(arrayElement);
    }

    for (var i = 205; i < segments + 195; i++) {
      var x = (i - 200) * distance
      var y = canvasHeight + parseInt(  "-" + this.fbc_array[i] );
      var arrayElement = [x,y]
      coordinates_three.push(arrayElement);
    }


    for (var i = 305; i < segments + 295; i++) {
      var x = (i - 300) * distance
      var y = canvasHeight + parseInt(  "-" + this.fbc_array[i] );
      var arrayElement = [x,y]
      coordinates_four.push(arrayElement);
    }

    coordinates.push([canvasWidth,canvasHeight])
    coordinates_two.push([canvasWidth,canvasHeight])
    coordinates_three.push([canvasWidth,canvasHeight])
    coordinates_four.push([canvasWidth,canvasHeight])

    app.newPath = new Path({
      segments: coordinates,
      strokeColor: 'green',
      strokeWidth: 5,
      fillColor: 'green',
      closed: true
    });

    app.newPath_two = new Path({
      segments: coordinates_two,
      strokeColor: 'blue',
      strokeWidth: 5,
      fillColor: 'blue',
      opacity: 0.5,
      closed: true
    });

    app.newPath_three = new Path({
      segments: coordinates_three,
      strokeColor: 'orange',
      strokeWidth: 5,
      fillColor: 'orange',
      // opacity: 0.5,
      closed: true
    });

    app.newPath_four = new Path({
      segments: coordinates_four,
      strokeColor: 'red',
      strokeWidth: 5,
      fillColor: 'red',
      opacity: 0.5,
      closed: true
    });

    // // app.newPath_one.rotate(45);
    // app.newPath_two.rotate(45);
    // app.newPath_three.rotate(90);
    // app.newPath_four.rotate(45);


    paper.view.draw();
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

    // app.myCircle = new paper.Path.Circle(new Point(100, 70), 5);
    // app.myCircle.fillColor = 'red';

	  var durationLine = { x: startX, y: startY };
		// this.newBranch( durationLine, { x: this.branchSpeed, y: 0 } );

		this.frameLooper();
	},

	frameLooper: function() {
		window.requestAnimationFrame( this.frameLooper.bind(this) );

    paper.view.onFrame = function() {
      // On each frame, rotate the path by 3 degrees:
      // path.rotate(3);
      app.snowFlakeView.plotIntensity();
    }

	  this.fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
    app.snowFlakeView.plotIntensity();
	  this.analyser.getByteFrequencyData(this.fbc_array);
    // debugger;
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

// var inc = 0;

// window.setInterval(function () {
//   if (app.myCircle) {
//     if (inc % 2 === 0 ) {
//       app.myCircle.scale( 5 )
//     } else {
//       app.myCircle.scale( 0.2 )
//     }
//   }
//   inc++;
// }, 250);



