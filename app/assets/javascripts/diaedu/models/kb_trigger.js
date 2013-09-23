Discourse.KbTrigger = Discourse.KbObj.extend({
  name: '',

  // IDs of related glyprobs
  parent_ids: null,

  relatedObjDataType: null,

  init: function() {
    this._super();
    this.set('relatedObjDataType', Discourse.KbDataType.get('glycemic-problems'));
  },

  // builds a data object to submit to server
  serialize: function() {
    var data = this.getProperties('name', 'description', 'parent_ids');
    this.serializeTags(data);
    return data;
  }

});