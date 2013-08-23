Discourse.KbGlyprobsIndexRoute = Discourse.Route.extend({
  beforeModel: function(transition) {
    this.transitionTo('kb_glyprobs.page', Discourse.KbGlyprobPage.create({page_id: 1}));
  }
});
