Discourse.KbGlyprob = Discourse.KbObj.extend({

  // the event object as received from the store
  event: '',

  // a new event name that we are submitting to the store, which will handle creation of the event object
  event_name: null,

  // high/low
  evaluation: null,

  init: function() {
    this.set('dataType', Discourse.KbDataType.get('glycemic-problems'));
    this._super();
  },

  // builds a data object to submit to server
  serialize: function() {
    var data = this.getProperties('evaluation', 'event_name', 'description');
    this.serializeTags(data);
    return data;
  }

});

Discourse.KbGlyprob.reopenClass({
  dataTypeName: 'glycemic-problems'
})