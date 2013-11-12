Discourse.KbObjRoute = Discourse.Route.extend({
  model: function(params, transition) {
    return Discourse.KbDataType.get(params.data_type);
  },
  
  renderTemplate: function() {
    this.render('diaedu/templates/kb_objs/layout');
  },

  serialize: function(model) {
    return {data_type: model.name};
  }
});
