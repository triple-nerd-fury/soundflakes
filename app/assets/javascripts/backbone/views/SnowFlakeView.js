var app = app || {};

app.SnowFlakeView = Backbone.View.extend({
	el: '#main',

	initialize: function( track ) {
		this.track = track;
	},

	render: function() {
		var snowflakeTemplate = $('#snowflakeTemplate').html();
		this.$el.html( snowflakeTemplate );
		this.startMusic();
	},

	startMusic: function() {
		// var trackURL = "<%= @track_stream %>";
		var trackURL = this.track.stream_url + "?client_id=dea3c2dce5d40ad0ee8ef7c8275d8dd5";

	  var audio = new Audio();
	  audio.src = trackURL;
	  audio.controls = true;
	  audio.loop = true;
	  audio.autoplay = true;
	  audio.crossOrigin="anonymous";

		  // Establish all variables that analyser will use
		var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

		//Initialize the MP3 player after the page loads all of its HTML into the window
		initMp3Player();

		function initMp3Player(){
		  document.getElementById('audio_box').appendChild(audio);
		  context = new AudioContext(); // AudioContext object instance
		  analyser = context.createAnalyser(); // AnalyserNote method
		  canvas = document.getElementById('analyser_render');
		  ctx = canvas.getContext('2d');
		  // Re-route audio playback into the processing graph of the audio context
		  source = context.createMediaElementSource(audio);
		  source.connect(analyser);
		  analyser.connect(context.destination);
		  frameLooper();
		}

		// frameLooper() animates any style of graphics you wish to the audio frequency
		// Looping at the default frame rate that the browser provides(approx. 60 FPS)
		function frameLooper(){
		  window.requestAnimationFrame(frameLooper);
		  fbc_array = new Uint8Array(analyser.frequencyBinCount);
		  analyser.getByteFrequencyData(fbc_array);
		  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
		  ctx.fillStyle = '#00CCFF'; // Color of the bars
		  bars = 100;
		  for (var i = 0; i < bars; i++) {
		    bar_x = i * 3;
		    bar_width = 2;
		    bar_height = -(fbc_array[i] / 2);
		    //  fillRect( x, y, width, height ) // Explanation of the parameters below
		    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
		  }
		}

	}
});