var app = app || {};

app.AppView = Backbone.View.extend({
	el: '#main',

	events: {
		'click button' : 'search'
	},

	render: function() {
		var appViewTemplate = $('#appViewTemplate').html();
		this.$el.html( appViewTemplate );
	},

	search: function(event) {
		event.preventDefault();
		var query = $('#songSearchInput').val();
		var view = this;

		SC.initialize({
		  client_id: 'dea3c2dce5d40ad0ee8ef7c8275d8dd5'
		});

		SC.get('/tracks', { q: query }, function(tracks) {
  		console.log(tracks);
  		
			var searchResultsView = new app.SearchResultsView();
			searchResultsView.render( tracks );
		});
	}
});