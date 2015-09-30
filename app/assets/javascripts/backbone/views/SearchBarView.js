var app = app || {};

app.SearchBarView = Backbone.View.extend({
	el: '#header',

	events: {
		'click button' : 'search'
	},

	render: function() {
		var searchBarTemplate = $('#searchBarTemplate').html();
		this.$el.append( searchBarTemplate );
	},

	search: function(event) {
		event.preventDefault();
		var query = $('#songSearchInput').val();
		var view = this;

		SC.initialize({
		  client_id: 'dea3c2dce5d40ad0ee8ef7c8275d8dd5'
		});

		SC.get('/tracks', { q: query }, function(tracks, error) {
			if ( error ) {
				console.log(error.message);
				return;
			} 

			if ( tracks.length !== 0 ) {
				var searchResultsView = new app.SearchResultsView();
				searchResultsView.render( tracks );
			} else {
				var searchResultsView = new app.SearchResultsView();
				searchResultsView.render( false );
			}
		});

	}
});