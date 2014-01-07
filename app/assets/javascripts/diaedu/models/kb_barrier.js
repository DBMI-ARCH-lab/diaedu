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
  dataTypeName: 'barriers',

  // defines the other subtypes to which this one is related
  relations: function() {
    return [
      Discourse.KbObjRelation.create({other: Discourse.KbTrigger, direction: 'backward'}),
      Discourse.KbObjRelation.create({other: Discourse.KbGoal, direction: 'forward'})
    ];
  }
});