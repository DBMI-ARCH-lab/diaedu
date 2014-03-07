Discourse.KbGlyprob = Discourse.KbObj.extend({

  // the event object as received from the store
  event: '',

  // a new event name that we are submitting to the store, which will handle creation of the event object
  eventName: null,

  // high/low
  evaluation: null,

  init: function() {
    this.set('dataType', Discourse.KbDataType.get('glycemic-problems'));
    this._super();
  },

  // builds a data object to submit to server
  // overrides parent method
  serialize: function() { var self = this;
    var data = self._super();

    console.log("super", data);

    // discard name and inlink properties and add eval and event name
    delete data.name;
    delete data.inlinkIds;
    data.evaluation = self.get('evaluation');
    data.eventName = self.get('eventName');

    return data;
  }

});

Discourse.KbGlyprob.reopenClass({
  dataTypeName: 'glycemic-problems',

  // defines the other subtypes to which this one is related
  relations: function() {
    return [
      Discourse.KbObjRelation.create({other: Discourse.KbTrigger, direction: 'forward'})
    ];
  }

})