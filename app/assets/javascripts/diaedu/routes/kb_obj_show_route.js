Discourse.KbObjShowRoute = Discourse.Route.extend({
  model: function(params, transition) {
    return Discourse.KbObj.find({dataType: this.modelFor('kb_obj')});
  },
  
  renderTemplate: function() {
    this.render('diaedu/templates/kb_objs/show');
  },

  serialize: function(model) {
    return {id: model.id};
  }
});
