Discourse.KbHomeRoute = Discourse.Route.extend({
  activate: function() {
    Discourse.set('title', I18n.t('diaedu.title'));
  },

  renderTemplate: function() {
    this.render('javascripts/diaedu/templates/home');
  }
});
