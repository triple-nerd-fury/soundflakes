_.templateSettings = {
   evaluate : /\{\[([\s\S]+?)\]\}/g,     // {[ console.log("Hello"); ]} - runs
   interpolate : /\{\{([\s\S]+?)\}\}/g   // {{ key }} - interpolates
};

$(document).ready(function() {
	app.router = new app.AppRouter();
	Backbone.history.start();
  paper.install(window);
  $('#logo').click(function() {
  	window.location.reload();  
  });
});