Discourse.KbGoal = Discourse.KbObj.extend({
  name: '',

  init: function() {
    this.set('dataType', Discourse.KbDataType.get('goals'));
    this._super();
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