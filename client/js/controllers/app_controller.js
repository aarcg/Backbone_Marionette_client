/*
** Main app controller.
** Insert business logic to wire routes to views
*/

var appRegion = new Marionette.Region({el: '#app'});

module.exports = AppController = Marionette.Controller.extend({

	initialize: function() {

		App.core.vent.trigger('app:log', 'AppController: initializing');

	},

	home: function() {

		//Route for #home
		var AppView = require('../views/app_view');

		//console logging
		App.core.vent.trigger('app:log', 'AppController: home route hit');

    //show view
		appRegion.show(new AppView());

		window.App.router.navigate('#');
		
	}

});