var app = app || {};

app.VisualControlsView = Backbone.View.extend({
	el: '#visual-controls',

	render: function() {
		var visualControlTemplate = $('#visualControlTemplate').html();
		this.$el.html( visualControlTemplate );
	}
});