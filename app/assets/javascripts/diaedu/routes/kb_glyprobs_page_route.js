Discourse.KbGlyprobsPageRoute = Discourse.Route.extend({
  model: function(params) {
    // on first load, create empty shell that will be updated by setupController
    return Discourse.KbGlyprobPage.create({page_id: params.page_id});
  },

  setupController: function(controller, model) {
    // let the view know we are loading
    controller.set('loading', true);
    var self = this;
    if (!model.objs) {
      Discourse.KbGlyprobPage.find(model.page_id).then(function(loaded){
        controller.set('model', loaded);
        controller.set('loading', false);
      });
    }
  },

  renderTemplate: function() {
    this.render('diaedu/templates/glyprobs/index');
  },
  
  serialize: function(model) {
    return {page_id: model.page_id};
  }
});
