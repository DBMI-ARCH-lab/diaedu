Discourse.KbObjShowRoute = Discourse.Route.extend({
  model: function(params, transition) {
    return Discourse.KbObj.find({dataType: this.modelFor('kb_obj')});
  },
  
  serialize: function(model) {
    return {id: model.id};
  }
});
