Discourse.KbObjShowRoute = Discourse.Route.extend({
  model: function(params, transition) {
    // since this method won't always be called, just return a placeholder indicating the ID
    return {id: params.id};
  },
  
  setupController: function(controller, model) {
    // let the view know we are loading
    controller.set('loading', true);

    // fetch object
    Discourse.KbObj.find({dataType: this.modelFor('kbObj'), id: model.id})
      .done(function(obj){
        controller.set('model', obj);

      }).fail(function(e){
        console.log("FETCH ERROR:", e.message)

      }).always(function(){
        controller.set('loading', false);
      });
  },

  renderTemplate: function() {
    this.render('diaedu/templates/kb_objs/show');
  },

  serialize: function(model) {
    return {id: model.id};
  }
});
