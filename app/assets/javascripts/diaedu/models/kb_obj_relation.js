// A definition of a relationship between a given KbObj subtype (e.g. KbGlyprob) and another subtype (e.g. KbTrigger)
Discourse.KbObjRelation = Discourse.Model.extend({

  // the class being related
  other: null,

  // a string indicating whether traversing this relationship is considered going 'forward' in the knowledgebase or 'backward'
  direction: null

});