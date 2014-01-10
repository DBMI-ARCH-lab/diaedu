Discourse.KbBarrier = Discourse.KbObj.extend({
  name: '',

  init: function() {
    this.set('dataType', Discourse.KbDataType.get('barriers'));
    this._super();
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