var app = app || {};

app.TrackInfoView = Backbone.View.extend({
	el: '#main',

	initialize: function( track ) {
		this.track = track;
	},

	render: function() {
		this.$el.addClass('open');
		var trackInfoTemplate = $('#trackInfoTemplate').html();

		$trackInfoTemplate = $(trackInfoTemplate);
		$trackInfoTemplate.find('.track-name').text( this.track.title );
		$trackInfoTemplate.find('.track-artist').text( this.track.user.username );

		this.$el.prepend( $trackInfoTemplate );

		var visualControlsView = new app.VisualControlsView();
		visualControlsView.render();
	}
});