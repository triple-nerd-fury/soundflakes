var app = app || {};

app.SearchResultsView = Backbone.View.extend({
	el: '#main',

	render: function( tracks ) {
		var searchResultsTemplate = $('#searchResultsTemplate').html();
		this.$el.empty();
		this.$el.append( searchResultsTemplate );

		_.each(tracks, function(track) {
			var resultView = new app.ResultView(track);
			resultView.render();
		});
	}
});