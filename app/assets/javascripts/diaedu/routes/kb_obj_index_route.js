Discourse.KbObjIndexRoute = Discourse.Route.extend({
  model: function(params, transition) {
    this.transitionTo('kb_obj_page.index', this.modelFor('kb_obj'), Discourse.KbObjPage.create({page_id: 1, filter_params: 'all'}));
  }
});
