Discourse.KbObjRoute = Discourse.Route.extend(Discourse.KbLoginRedirectable, {
  model: function(params, transition) {
    return Discourse.KbDataType.get(params.dataType);
  },

  renderTemplate: function() {
    this.render('javascripts/diaedu/templates/obj_layout');
  },

  serialize: function(model) {
    return {dataType: model.name};
  }
});
