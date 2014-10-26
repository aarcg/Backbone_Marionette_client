/*
** App bootstrapper
*/

require('./vendor_shim');

var AppController = require('./controllers/app_controller'),
    Router = require('./router'),
    logging = false;

module.exports = App = function App() {};

App.prototype.start = function() {

	App.core = new Marionette.Application();

	App.core.vent.on('app:set:logging', function(data) {
		if(typeof data === 'boolean') {
			logging = data;
		}
	});

	App.core.vent.on('app:log', function(data) {
		if(logging && console.log) {
		  console.log(data);
	  }
	});

	App.core.addInitializer(function(options) {

		this.vent.trigger('app:log', 'App; initializing app');
		
	});

	App.core.on('start', function(options) {
		if(Backbone.history) {
			App.controller = new AppController();
			App.router = new Router({controller: App.controller});
			App.core.vent.trigger('app:log', 'App: Starting Backbone.history()');
			Backbone.history.start();
		}

		this.vent.trigger('app:log', 'App: starting app');

	});

	App.core.start();
	
};