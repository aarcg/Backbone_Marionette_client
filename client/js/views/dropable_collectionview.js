module.exports = DropableCollectionView = Backbone.Marionette.CollectionView.extend({
  
  idNoConflict: false,

  dragEvents: {
    'dragenter': 'dragenter',
  	'dragover': 'dragover',
  	'drop': 'drop'
  },

  delegateEvents: function(eventsArg) {
    ev = _.extend({}, eventsArg, this.events, this.dragEvents);
    Marionette.View.prototype.delegateEvents.call(this, ev);
  },

  dragenter: function dragenter(ev) {
    ev.preventDefault();
    App.dragdropController.trigger('dragdrop:addCollection', this.collection);
  },

  dragover: function dragover(ev) {
  	ev.preventDefault();
  },

  drop: function drop(ev) {
    App.dragdropController.trigger('dragdrop:drop');
	}

});