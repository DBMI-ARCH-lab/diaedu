Discourse.KbHomeRoute = Discourse.Route.extend({
  activate: function() {
    Discourse.set('title', I18n.t('kb.title'));
  },
  renderTemplate: function() {
    this.render('diaedu/templates/home/index');
  },
  setupController: function(controller, model) {
  }
});
