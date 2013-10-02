Discourse.KbGoal = Discourse.KbObj.extend({
  name: '',

  // IDs of related triggers
  parent_ids: null,

  init: function() {
    this.set('dataType', Discourse.KbDataType.get('goals'));
    this.set('relatedObjDataType', Discourse.KbDataType.get('triggers'));
    this._super();
  },

  // builds a data object to submit to server
  serialize: function() {
    var data = this.getProperties('name', 'description', 'parent_ids');
    this.serializeTags(data);
    return data;
  }

});

Discourse.KbGoal.reopenClass({
  shortName: 'goals'
});

// this is a hack b/c doesn't seem to be a way to acces class from instance (?!)
Discourse.KbGoal.reopen({klass: Discourse.KbGoal});