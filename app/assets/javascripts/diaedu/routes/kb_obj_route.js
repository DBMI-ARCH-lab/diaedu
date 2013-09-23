Discourse.KbObjRoute = Discourse.Route.extend({
  model: function(params, transition) {
    return Discourse.KbDataType.get(params.data_type);
  },
  
  serialize: function(model) {
    return {data_type: model.name};
  }
});
