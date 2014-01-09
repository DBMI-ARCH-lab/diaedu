Discourse.KbObjIndexRoute = Discourse.Route.extend({
  redirect: function(model) {
    // transition to the first page, no filter
    this.transitionTo('kb_obj.filtered_page', Discourse.KbObjPage.create({page_id: 1, filter_params: 'all'}));
  }
});
