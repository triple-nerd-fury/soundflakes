var app = app || {};

app.SideBarView = Backbone.View.extend({
	el: '#global-nav',

	render: function() {
		var sideBarTemplate = $('#sideBarViewTemplate').html();
		this.$el.html(sideBarTemplate);
	}
});