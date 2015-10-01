var app = app || {};
var throttledGenerate;

var branchAmount = 5;
var branchMaxSpeed = 0.01;
var lastShortAvg = 0;
var lastLongAvg = 0;
var avg = 0;
var currentHighest = [];
var longHistoryArray =[];
var moveFlake = 0;
var count = 0;

// var Branch = function( path, origin, direction ) {
//   this.path = path;
//   this.location = origin;
//   this.direction = direction;

//   this.move = function(fbc_array) {
//     var newLocation = this.location.add(this.direction);
//     this.path.lineTo(newLocation);
//     this.location = newLocation;
    
//     this.checkFbc(fbc_array);
//     this.checkLimits();
//   };

//   this.generateNewBranches = function() {  
//   	// console.log("Branch Generated");
//   	// for ( x = 0; x < branchAmount; x++ ) {
//    	//    var index = Math.floor(Math.random() * app.snowFlakeView.branches.length); // select random branch from available branches
//    	//    if ( app.snowFlakeView.branches[index] ) { // if branch exists in random index
//   	for( x = 0; x < 1; x++ ) {
//     		var newOrigin = {
// 	  			x: app.snowFlakeView.branches[0].location.x,
// 	  			y: app.snowFlakeView.branches[0].location.y
// 	  		};
// 	  		var newDirection = {
// 	  			x: (Math.random() * 0.6) - 0.3,
// 	  			y: (Math.random() * 0.6) - 0.3
// 	  		};
// 	  		app.snowFlakeView.newBranch( newOrigin, newDirection );
//       }
//     // }
//   };

//   if ( !throttledGenerate ) { throttledGenerate = _.throttle( this.generateNewBranches, 1000 ); }
  
//   this.checkFbc = function(fbc_array) {
//   	var total = 0;
//   	for ( var x = 0; x < fbc_array.length; x++ ) {
//   		total += fbc_array[x];
//   	}
//   	total = total / fbc_array.length;

//     if (!currentHighest.length){
//       currentHighest.push(total)
//     }

//     if ((currentHighest[0] - 5) < total) {
//       // app.myCircle.scale( 5 );
//       currentHighest[0] = total
//       // throttledGenerate();
//     }
//     // if ( Math.random() <= 0.5 ) {
//     //   app.myCircle.scale( 2 );
//     // } else {
//     //   // debugger;
//     //   app.myCircle.scale( 0.5 );
//     // }

//     // console.log(currentHighest)

//  //    if (total > 70){
//  //   console.log(total)
//  // }
//   //   lastShortAvg = (5 * lastShortAvg + total)/6
   
//   //   // if (count > 100) {
//   //   //   var compare = lastShortAvg/lastLongAvg
//   //   //   if (compare > 1.3) {   
//   //   //     console.log(compare)
//   //   //   }
//   //   // } 

//   //   lastLongAvg = (29 * lastLongAvg + total)/30


//      if ( total/avg > 1.3 ) { 
//      throttledGenerate();
//    // console.log(total/avg)
//     }

//      // historyArray.push(total)

//   //   if (count % 100 == 0) {
//   //     longHistoryArray.push(historyArray)
//   //     }
//   //     if (historyArray.length > 100) {
//   //     historyArray.shift();
//   //   }
   

//   // if (longHistoryArray.length > 1000) {
//   //   longHistoryArray.shift();
//   // } 
//   // //  if (count % 1000 == 0) {
//   // //   superLongHistoryArray.push(longHistoryArray);
//   // // } 

//     avg = total
//   //   count += 1
//   //   var shortHistory = 0;
//   //   for (i = 0; i < historyArray.length; i++) {
//   //     shortHistory += historyArray[i];
//   //   }
//   //    console.log('short' + shortHistory/historyArray.length )

//   //    var longHistory = 0;
//   //   for (i = 0; i < longHistoryArray.length; i++) {
//   //     for (j = 0; j < longHistoryArray[i].length; j++){
//   //     longHistory += longHistoryArray[i][j];
//   //     }
//   //   }
//   //    console.log('long' + longHistory)
//   };

//   this.checkLimits = function() {
//   	var xLimit = $('#analyser_render').width();
// 	  var yLimit = $('#analyser_render').height();
//   	if ( this.location.x <= 0 || this.location.y <= 0 || this.location.x >= xLimit || this.location.y >= yLimit) {
//   		this.direction.x = 0;
//   		this.direction.y = 0;
//   	}
//   };
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

		var snowflakeCanvasTemplate = $('#snowflakeCanvasTemplate').html();
		this.$el.append( snowflakeCanvasTemplate );

		var trackInfoView = new app.TrackInfoView( this.track );
		trackInfoView.render();

		this.startMusic();
	},


	// newBranch: function( origin, direction ) { // Two objects that contain x and y coords
	// 	  var path = new paper.Path();
	// 	  var color = '#' + ( function co(lor) { return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (lor.length == 6) ?  lor : co(lor); })('');
	// 	  path.strokeColor = color;
	// 	  var start = new paper.Point( origin.x, origin.y );  
	// 	  path.moveTo(start);

	//   var newBranch = new Branch( path, start, direction );
	//   this.branches.push(newBranch);
	// },

  // drawInitialBeatCircle: function () {
  //   var centerHorizontal = parseInt( $("canvas").width() ) / 2;
  //   var centerVertical = parseInt( $("canvas").height() ) / 2;

  //   app.beatCircle = new Path.Circle({
  //       center: new Point( centerHorizontal, centerVertical ),
  //       radius: 35,
  //       fillColor: 'green',
  //       strokeColor: 'green'
  //   });

  //   paper.view.draw();
  // },

//   scaleBeatCircle: function ( number ) {
//     if ( app.beatCircle ) {
//       var desired  = number;
//       var original = 1 / desired;
//       var originalRadius = app.beatCircle.bounds.width / 2;
//       var segmentsOfAnimation = ( desired - original ) / 20;

//       console.log( "Desired Scale: ", desired );
//       console.log( "Original Scale: ", original );
//       console.log( "Segments of Animation: ", segmentsOfAnimation );
//       var centerHorizontal = parseInt( $("canvas").width() ) / 2;
//       var centerVertical = parseInt( $("canvas").height() ) / 2;

//       var animationInterval = window.setInterval(function () {
//         app.beatCircle.bounds.width = app.beatCircle.bounds.width * ( segmentsOfAnimation + 1 );
//         app.beatCircle.bounds.height = app.beatCircle.bounds.height * ( segmentsOfAnimation + 1 ); 
//         app.beatCircle.position = new Point( centerHorizontal, centerVertical );
//         paper.view.draw();
//       }, 100);

//       window.setTimeout(function () {
//         window.clearInterval( animationInterval );
//         window.setTimeout( function () {
//           app.beatCircle.bounds.width = originalRadius * 2;
//           app.beatCircle.bounds.height = originalRadius * 2; 
//           app.beatCircle.position = new Point( centerHorizontal, centerVertical );  

//           paper.view.draw();
//         }, 250);
//       }, 2000);

//       // for ( var i = 1; i < 20; i++ ) {
//         // Immediately Invoked Function Expression (IIFE) - Douglas Crockford is the man
//         // (function (i) {
//         //   window.setTimeout(function () {
//         //     app.beatCircle.bounds.width = app.beatCircle.bounds.width * ( segmentsOfAnimation + 1 );
//         //     app.beatCircle.bounds.height = app.beatCircle.bounds.height * ( segmentsOfAnimation + 1 ); 
//         //     app.beatCircle.position = new Point( centerHorizontal, centerVertical );
//         //     paper.view.draw();
//         //   }, 100);
//         // })(i);
//       // }
// // 
//       // app.beatCircle.scale( desired );
//       // paper.view.draw();


//       // Sort out the initial ratio
//         // With number as the desired size increase
//     }
//   },

  visualiser: function() {
    playing = true;
    // app.newPath = new Path();
    // app.start = new Point(50,100);
    // app.end = new Point(50, 500);
    // app.newPath.add(app.start);
    // app.newPath.add(app.end);
    // app.newPath.strokeColor = 'pink';

    if ( app.newPath_one ) {
      app.newPath_one.remove();
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

    app.newPath_one = new app.paper.Path({
      segments: coordinates,
      strokeColor: 'white',
      strokeWidth: 5,
      fillColor: 'white',
      opacity: 0.5,
      closed: true
    });

    app.newPath_two = new app.paper.Path({
      segments: coordinates_two,
      strokeColor: 'white',
      strokeWidth: 5,
      fillColor: 'white',
      opacity: 0.5,
      closed: true
    });

    app.newPath_three = new app.paper.Path({
      segments: coordinates_three,
      strokeColor: 'white',
      strokeWidth: 5,
      fillColor: 'white',
      opacity: 0.5,
      closed: true
    });

    app.newPath_four = new app.paper.Path({
      segments: coordinates_four,
      strokeColor: 'white',
      strokeWidth: 5,
      fillColor: 'white',
      opacity: 0.5,
      closed: true
    });

    // // app.newPath_one.rotate(45);
    // app.newPath_two.rotate(45);
    // app.newPath_three.rotate(90);
    // app.newPath_four.rotate(45);
    app.paper.view.draw();
  },

  drawSnowflake: function() {

    if ( app.newPath ) {
      app.snowflake.remove();  
    }

    var canvasHeight = $('canvas').height() / 2
    var canvasWidth = $('canvas').width()
    var segments = 100;
    var distance = canvasWidth / segments;

    var coordinates = [[0, canvasHeight]];
    var coordinatesFlip = [[0, canvasHeight]];

    if (this.fbc_array) {

      _.each(_.range(5, segments - 5), function(num) {
        var x = num * distance
        var y = canvasHeight - 80 + app.snowFlakeView.fbc_array[num];     
        var yInverse = canvasHeight + 80 + parseInt( "-" + app.snowFlakeView.fbc_array[num]);
        var arrayElement = [x,y]
        var arrayElementInverse = [x,yInverse]
        coordinates.push(arrayElement);
        coordinatesFlip.push(arrayElementInverse);
      })
    }

    coordinates.push([canvasWidth,canvasHeight])
    coordinatesFlip.push([canvasWidth,canvasHeight])

    app.newPath = new app.paper.Path({
      segments: coordinates,
      strokeColor: 'white',
      strokeWidth: 2,
      fillColor: 'white',
      opacity: 0.5,
      closed: true
    });  

    app.newPathFlip = new app.paper.Path({
      segments: coordinatesFlip,
      strokeColor: 'white',
      strokeWidth: 2,
      fillColor: 'white',
      opacity: 0.5,
      closed: true
    });

    app.group = new app.paper.Group([app.newPath, app.newPathFlip])
    app.group.scale(.5)
    app.group.rotate(90)

    app.groupTwo = app.group.clone()
    app.groupTwo.rotate(60)

    app.groupThree = app.group.clone()
    app.groupThree.rotate(120)

    app.groupFour = app.group.clone()
    app.groupFour.rotate(180)

    app.groupFive = app.group.clone()
    app.groupFive.rotate(240)

    app.groupSix = app.group.clone()
    app.groupSix.rotate(300)

    //vertical group
    app.groupVertical = new app.paper.Group([app.group, app.groupFour])
    app.groupSixty = new app.paper.Group([app.groupTwo, app.groupFive])
    app.groupOneTwenty = new app.paper.Group([app.groupThree, app.groupSix])    

    app.snowflake = new app.paper.Group([app.groupVertical, app.groupSixty, app.groupOneTwenty])
  
    app.snowflake.onMouseDown = function(event) {
      app.copy = this.clone();
      app.copy.scale(0.2,0.2);
      var x = Math.floor(Math.random() * $("canvas").width())
      var y = Math.floor(Math.random() * $("canvas").height())
      app.copy.position = new app.paper.Point( 100, 100 );

      app.myCircle = new app.paper.Path.Circle(new app.paper.Point(100, 70), 5);
      app.myCircle.fillColor = 'red';

      // console.log( app.copy, app.copy.position );
      // console.log('click')
      app.paper.view.draw();
    } 
   app.paper.view.draw();
  },

	initMp3Player: function() {
    playing = true;
     if ( this.context ) {
      this.context = null;
    }

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


    app.paper = new paper.PaperScope();
    app.paper.setup($("canvas")[0]);

    // app.paper.view.draw();

		this.frameLooper();
	},

  paperFrame: function() {
    // On each frame, rotate the path by 3 degrees:
    // path.rotate(3);
    if ( $('#snowflake-visual').is(':checked') ){
      app.paper.project.clear()
      app.snowFlakeView.drawSnowflake();
    }
    else if ( $('#wave-visual').is(':checked') ) {
      app.paper.project.clear()
      app.snowFlakeView.visualiser();
    }

   //  if (app.snowflake) {
   //  app.snowflake.rotate(moveFlake);
   //   moveFlake += 1;
   // }
  },

	frameLooper: function() {
		window.requestAnimationFrame( this.frameLooper.bind(this) );

    app.paper.view.on({
      frame: this.paperFrame
    });

	  this.fbc_array = new Uint8Array(this.analyser.frequencyBinCount);

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
  	// if (!app.snowFlakeView.audio.paused) {
   //    for ( x = 0; x < this.branches.length; x++ ) {
   //    	var newLocation = this.branches[x].location.add(this.branches[x].direction);
   //    	this.branches[x].move(this.fbc_array);
   //    }
   //   	paper.view.draw();
   //  }
	},

	startMusic: function() {
		this.trackURL = this.track.stream_url + "?client_id=dea3c2dce5d40ad0ee8ef7c8275d8dd5";
	  this.audio = new Audio();
	  this.audio.src = this.trackURL;
	  this.checkErrors();
	  this.audio.controls = true;
	  this.audio.loop = true;
	  this.audio.autoplay = true;
	  this.audio.crossOrigin="anonymous";


		$(this.audio).on('canplay', function() {
      if ( !playing ) {
  			app.snowFlakeView.initMp3Player();
      }
		});
	},

	checkErrors: function() {
	 $(this.audio).error(function(error) {
  	switch (this.networkState) {
  		case 0:
  			alert("No track available. Try a different track!");
  			var appView = new app.AppView();
				appView.render()
  			break;
  		case 1:
  			alert("Looks like the network is having problems, try a different track!");
  			var appView = new app.AppView();
				appView.render()
  			break;
  		case 2:
  			console.log("Loading track...");
  			break;
  		case 3:
  			alert("There is no source available, try a different track!");
  			var appView = new app.AppView();
				appView.render();
  			break;
  		default:
  			alert("Oops! An error occurred, try a different track!");
  			var appView = new app.AppView();
				appView.render()
  			break;
	  	}
	  });
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




