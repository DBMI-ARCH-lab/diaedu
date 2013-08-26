Discourse.KbObjPageRoute = Discourse.Route.extend({
  model: function(params) {
    // on first load, create empty shell that will be updated by setupController
    return Discourse.KbObjPage.create({page_id: params.page_id});
  },

  setupController: function(controller, model) {
    // let the view know we are loading
    controller.set('loading', true);

    // pass the data type to the controller
    var data_type = this.modelFor('kb_obj');
    controller.set('data_type', data_type);
    
    // if the model is just a shell, populate it
    if (!model.objs) {
      Discourse.KbObjPage.find(data_type, model.page_id).then(function(loaded){
        controller.set('model', loaded);
        controller.set('loading', false);
      }, function(e) {
        console.log("FETCH ERROR:", e.message)
      });
    }
  },

  renderTemplate: function() {
    this.render('diaedu/templates/glyprobs/index');
  },
    
  serialize: function(model) {
    return {data_type: this.modelFor('kb_obj').name, page_id: model.page_id};
  }
});
