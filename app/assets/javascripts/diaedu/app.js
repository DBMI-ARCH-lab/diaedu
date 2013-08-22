Discourse.Route.buildRoutes(function() {
  var router = this;
  this.route('kb_home', {path: '/kb'});
  this.resource('kb_glyprobs', {path: '/kb/glycemic-problems'}, function() {
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
  }
});

Discourse.KbGlyprobsRoute = Discourse.Route.extend({
  model: function() {
    return Discourse.KbGlyprob.findAll();
  },
  renderTemplate: function() {
    this.render('diaedu/templates/glyprobs/index');
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

Discourse.KbGlyprob = Discourse.Model.extend({

});

Discourse.KbGlyprob.reopenClass({
  findAll: function() {
    return Discourse.ajax("/kb/glycemic-problems").then(function (result) {
      var glyprobs = Em.A();
      result.glyprobs.forEach(function (g) {
        // TODO do this in i18n instead
        g.evaluation = g.evaluation.capitalize();
        
        glyprobs.pushObject(Discourse.KbGlyprob.create(g));
      });
      return glyprobs;
    });
  }
});