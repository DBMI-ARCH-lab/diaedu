Discourse.KbLoginRedirectable = Ember.Mixin.create({
  beforeModel: function() {
    if (!Discourse.User.current())
      this.transitionTo('login');
  }
});
