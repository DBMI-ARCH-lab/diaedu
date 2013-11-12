Discourse.KbHomeRoute = Discourse.Route.extend({
  activate: function() {
    Discourse.set('title', I18n.t('kb.title'));
  },
  
  renderTemplate: function() {
    this.render('diaedu/templates/kb_home/index');
  }
});
