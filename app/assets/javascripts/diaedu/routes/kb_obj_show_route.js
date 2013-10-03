Discourse.KbObjShowRoute = Discourse.Route.extend({
  model: function(params, transition) {
    // since this method won't always be called, just return a placeholder indicating the ID
    return this.modelFor('kbObj').get('modelClass').create({id: params.id});
  },

  serialize: function(model) {
    return {id: model.id, data_type: model.get('dataType.name')};
  }
});
