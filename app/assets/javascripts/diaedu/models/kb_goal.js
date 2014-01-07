Discourse.KbGoal = Discourse.KbObj.extend({
  name: '',

  // IDs of related objs
  parent_ids: null,

  init: function() {
    this.set('dataType', Discourse.KbDataType.get('goals'));
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
  dataTypeName: 'goals',

  // defines the other subtypes to which this one is related
  relations: function() {
    return [
      Discourse.KbObjRelation.create({other: Discourse.KbTrigger, direction: 'backward'}),
      Discourse.KbObjRelation.create({other: Discourse.KbBarrier, direction: 'backward'})
    ];
  }
});