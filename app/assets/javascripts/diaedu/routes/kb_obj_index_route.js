Discourse.KbObjIndexRoute = Discourse.Route.extend({
  redirect: function(model) {
    // transition to the first page, no filter
    this.transitionTo('kbObj.filteredPage', Discourse.KbObjPage.create({pageId: 1, filterParams: 'all'}));
  }
});
