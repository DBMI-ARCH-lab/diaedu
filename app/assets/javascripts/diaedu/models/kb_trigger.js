Discourse.KbTrigger = Discourse.KbObj.extend({
  name: '',

  // IDs of related glyprobs
  parent_ids: null,

  init: function() {
    this.set('dataType', Discourse.KbDataType.get('triggers'));
    this.set('relatedObjDataType', Discourse.KbDataType.get('glycemic-problems'));
    this._super();
  },

  // builds a data object to submit to server
  serialize: function() {
    var data = this.getProperties('name', 'description', 'parent_ids');
    this.serializeTags(data);
    return data;
  }

});

Discourse.KbTrigger.reopenClass({
  shortName: 'triggers'
});

// this is a hack b/c doesn't seem to be a way to acces class from instance (?!)
Discourse.KbTrigger.reopen({klass: Discourse.KbTrigger});