var app = app || {};
window.requestAnimFrame = (function(){ 
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();
var moveFlake = 0;


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


  visualiser: function() {
    playing = true;

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
  
    app.snowflake.onMouseDown = function() {
      app.copy = this.clone();
            app.copy.scale(0.2,0.2);
      var x = Math.floor(Math.random() * $("canvas").width())
      var y = Math.floor(Math.random() * $("canvas").height())
      app.copy.position = new app.paper.Point(x,y);
      console.log(app.copy);
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
   
      if ( $('#snowflake-visual').is(':checked') ){
      app.paper.project.clear()
      app.snowFlakeView.drawSnowflake();
    }
    else if ( $('#wave-visual').is(':checked') ) {
      app.paper.project.clear()
      app.snowFlakeView.visualiser();
    }
    if (app.snowflake) {
    app.snowflake.rotate(moveFlake);
     moveFlake += 0.5;
   }
    },

	frameLooper: function() {
		window.requestAnimFrame( this.frameLooper.bind(this) );

    app.paper.view.on({
      frame: this.paperFrame
    });

	  this.fbc_array = new Uint8Array(this.analyser.frequencyBinCount);

	  this.analyser.getByteFrequencyData(this.fbc_array);
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




