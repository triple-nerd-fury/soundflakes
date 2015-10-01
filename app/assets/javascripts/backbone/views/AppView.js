var app = app || {};

app.AppView = Backbone.View.extend({
	el: '#main',

	events: {
		'click button' : 'search'
	},

	render: function() {
		$('#searchForm').empty();
		
		var appViewTemplate = $('#appViewTemplate').html();
		this.$el.html( appViewTemplate );
		$('#songSearchInput-home').focus();
	},

	search: function(event) {
		event.preventDefault();
		var query = $('#songSearchInput-home').val();
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