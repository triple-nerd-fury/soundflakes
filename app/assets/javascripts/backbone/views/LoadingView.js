var app = app || {};

app.LoadingView = Backbone.View.extend({
	el: '#main',

	render: function() {
		var loadingTemplate = $('#loadingTemplate').html();
		this.$el.html( loadingTemplate );
	}
});