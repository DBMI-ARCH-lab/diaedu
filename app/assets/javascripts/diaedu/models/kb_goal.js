Discourse.KbGoal = Discourse.KbObj.extend({
  name: '',

  // IDs of related triggers
  parent_ids: null,

  relatedObjDataType: null,

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