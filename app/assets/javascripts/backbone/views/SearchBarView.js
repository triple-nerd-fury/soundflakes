var app = app || {};

app.SearchBarView = Backbone.View.extend({
	el: '#searchForm',

	events: {
		'click button' : 'search'
	},

	render: function() {
		var searchBarTemplate = $('#searchBarTemplate').html();
		this.$el.html( searchBarTemplate );
	},

	search: function(event) {
		event.preventDefault();
		var query = $('#songSearchInput').val();
		var view = this;
		
	 	var spotifyApi = new SpotifyWebApi();

		spotifyApi.searchTracks(query)
	  .then(function(data) {
	  	debugger;
	    if ( data.tracks.items.length !== 0 ) {
					var searchResultsView = new app.SearchResultsView();
					searchResultsView.render( data.tracks.items );
				} else {
					var searchResultsView = new app.SearchResultsView();
					searchResultsView.render( false );
				}
	  }, function(err) {
	    console.log(err);
			return;
	  });

	}
});