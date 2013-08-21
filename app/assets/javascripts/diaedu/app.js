Discourse.Route.buildRoutes(function() {
  var router = this;
  this.route('kb_home', {path: '/kb'});
  this.resource('kb_glycprobs', {path: '/kb/gycemic-problems'}, function() {
    this.route('new');
  });
  this.resource('kb_triggers', {path: '/kb/triggers'}, function() {
    this.route('new');
  });
  this.resource('kb_goals', {path: '/kb/goals'}, function() {
    this.route('new');
  });
});


Discourse.KbHomeRoute = Discourse.Route.extend({
  renderTemplate: function() {
    this.render('diaedu/templates/home/index');
  },
  setupController: function(controller, model) {
    controller.set('foo', 'bar');
  }
});

Discourse.KbGlycprobsRoute = Discourse.Route.extend({
  renderTemplate: function() {
    this.render('diaedu/templates/glycprobs/index');
  }
});

Discourse.KbTriggersRoute = Discourse.Route.extend({
  renderTemplate: function() {
    this.render('diaedu/templates/triggers/index');
  }
});

Discourse.KbGoalsRoute = Discourse.Route.extend({
  renderTemplate: function() {
    this.render('diaedu/templates/goals/index');
  }
});

Discourse.HeaderController.reopen({
  needs: "application",

  isKbActive: function() {
    return !!this.get('controllers.application.currentPath').match(/^kb_/);
  }.property('controllers.application.currentPath'),

  isCommunityActive: function() {
    return !this.get('controllers.application.currentPath').match(/^kb_/);
  }.property('controllers.application.currentPath')
})

