var app = app || {};

app.SearchResultsView = Backbone.View.extend({
	el: '#main',

	render: function( tracks ) {
		var searchBarView = new app.SearchBarView();
		searchBarView.render();
		
		var searchResultsTemplate = $('#searchResultsTemplate').html();
		this.$el.empty();
		this.$el.append( searchResultsTemplate );

		if ( tracks ) {
			_.each(tracks, function(track) {
				var resultView = new app.ResultView(track);
				resultView.render();
			});
		} else {
			searchResultsTemplate
			$('#searchResults').text("No search results found.");
		}
	}
});