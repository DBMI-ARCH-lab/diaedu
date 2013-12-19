Discourse.KbBarrier = Discourse.KbObj.extend({
  name: '',

  // IDs of related glyprobs
  parent_ids: null,

  init: function() {
    this.set('dataType', Discourse.KbDataType.get('barriers'));
    this._super();
  },

  // builds a data object to submit to server
  serialize: function() {
    var data = this.getProperties('name', 'description', 'parent_ids');
    this.serializeTags(data);
    return data;
  }

});

Discourse.KbBarrier.reopenClass({
  dataTypeName: 'barriers'
});