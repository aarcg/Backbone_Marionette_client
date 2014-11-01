module.exports = DraggableItemView = Marionette.ItemView.extend({

	attributes: function() {
		return {
			'draggable': true,
			'id': this.model.get('id')
		};
	},

	dragEvents: {
		'dragstart': 'dragstart',
		'dragend': 'dragend'
	},

	delegateEvents: function(eventsArg) {
    ev = _.extend({}, eventsArg, this.events, this.dragEvents);
    Marionette.View.prototype.delegateEvents.call(this, ev);
	},

	dragstart: function drag(ev) {
		var data = this.model;

		App.dragdropController.trigger('dragdrop:addModel', this.model);
	},

	dragend: function drop(ev) {

	}

});