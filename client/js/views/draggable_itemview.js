module.exports = DraggableItemView = Marionette.ItemView.extend({

	attributes: function() {
		return {
			'draggable': true,
			'id': this.model.get('id')
		};
	},

	testOnly: false,

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

		//is this a jquery event?
		if(ev.originalEvent) {
			ev = ev.originalEvent;
		}

		ev.dataTransfer.effectAllowed = 'move';
		ev.dataTransfer.dropEffect = 'move';
	  ev.dataTransfer.setData("text/plain", JSON.stringify(data));

	},

	dragend: function drop(ev) {

		if (this.testOnly === true) {
			this.model.clear();
		} else {
			this.model.destroy();
		}

	}

});