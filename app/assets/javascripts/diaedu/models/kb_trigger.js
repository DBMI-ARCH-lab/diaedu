Discourse.KbTrigger = Discourse.KbObj.extend({
  name: '',

  init: function() {
    this.set('dataType', Discourse.KbDataType.get('triggers'));
    this._super();
  }

});

Discourse.KbTrigger.reopenClass({
  dataTypeName: 'triggers',

  // defines the other subtypes to which this one is related
  relations: function() {
    return [
      Discourse.KbObjRelation.create({other: Discourse.KbGlyprob, direction: 'backward'}),
      Discourse.KbObjRelation.create({other: Discourse.KbBarrier, direction: 'forward'}),
      Discourse.KbObjRelation.create({other: Discourse.KbGoal, direction: 'forward'})
    ];
  }

});