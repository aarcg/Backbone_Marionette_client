module.exports = DropableCollectionView = Backbone.Marionette.CollectionView.extend({
  
  idNoConflict: false,

  dragEvents: {
  	'dragover': 'dragover',
  	'drop': 'drop'
  },

  delegateEvents: function(eventsArg) {
    ev = _.extend({}, eventsArg, this.events, this.dragEvents);
    Marionette.View.prototype.delegateEvents.call(this, ev);
  },

  dragover: function dragover(ev) {
  	ev.preventDefault();
  },

  drop: function drop(ev) {
    ev.preventDefault();

    //is this a jquery event?
    if(ev.originalEvent) {
      ev = ev.originalEvent;
    }

    var data = ev.dataTransfer.getData("text/plain"),
        jsonData = JSON.parse(data);

    if(this.idNoConflict === true) {
      jsonData.id = _.uniqueId();
    }
    
    this.collection.add(jsonData, {at: 0});

	}

});