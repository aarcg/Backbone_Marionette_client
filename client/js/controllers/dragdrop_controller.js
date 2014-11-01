module.exports = DragdropController = Marionette.Controller.extend({

	initialize: function() {
		this.on('dragdrop:addModel', this.addModel);
		this.on('dragdrop:addCollection', this.addCollection);
		this.on('dragdrop:drop', this.drop);
	},

	model: {},

	srcCollection: {},

	destCollection: {},

	addModel: function(model) {
		this.model = model;
		this.srcCollection = model.collection;
		App.core.vent.trigger('app:log', 'DragDrop: dropable model added');
	},

	addCollection: function(collection) {
		this.destCollection = collection;
		App.core.vent.trigger('app:log', 'DragDrop: model dragged to dropable collection');
	},

	drop: function() {
		this.destCollection.add(this.model, {at: 0});
		this.srcCollection.remove(this.model);
		App.core.vent.trigger('app:log', 'DragDrop: model droped on a dropable collection');
	}

});