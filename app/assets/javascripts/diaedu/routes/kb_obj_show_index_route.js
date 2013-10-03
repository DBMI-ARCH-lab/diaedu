Discourse.KbObjShowIndexRoute = Discourse.Route.extend({
  model: function(params, transition) {
    this.transitionTo('kb_obj_show.with_breadcrumb', this.modelFor('kbObjShow'));
  }
});
