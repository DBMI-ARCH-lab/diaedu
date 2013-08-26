Discourse.HeaderController.reopen({
  needs: "application",

  isKbActive: function() {
    return !!this.get('controllers.application.currentPath').match(/^kb_/);
  }.property('controllers.application.currentPath'),

  isCommunityActive: function() {
    return !this.get('controllers.application.currentPath').match(/^kb_/);
  }.property('controllers.application.currentPath'),

  dataTypes: function() {
    return Discourse.KbDataType.all();
  }.property()
})
