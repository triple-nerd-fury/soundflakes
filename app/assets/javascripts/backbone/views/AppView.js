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