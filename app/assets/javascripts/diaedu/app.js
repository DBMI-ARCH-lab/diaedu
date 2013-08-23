Discourse.Route.buildRoutes(function() {
  var router = this;
  this.route('kb_home', {path: '/kb'});
  this.resource('kb_glyprobs', {path: '/kb/glycemic-problems'}, function() {
    this.route('page', { path: '/page/:page_id' });
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

Discourse.KbGlyprobsIndexRoute = Discourse.Route.extend({
  beforeModel: function(transition) {
    this.transitionTo('kb_glyprobs.page', Discourse.KbGlyprobPage.create({page_id: 1}));
  }
});

Discourse.KbGlyprobsPageRoute = Discourse.Route.extend({
  model: function(params) {
    // on first load, create empty shell that will be updated by setupController
    return Discourse.KbGlyprobPage.create({page_id: params.page_id});
  },
  setupController: function(controller, model) {
    // let the view know we are loading
    controller.set('loading', true);
    var self = this;
    if (!model.objs) {
      Discourse.KbGlyprobPage.find(model.page_id).then(function(loaded){
        controller.set('model', loaded);
        controller.set('loading', false);
      });
    }
  },
  renderTemplate: function() {
    this.render('diaedu/templates/glyprobs/index');
  },
  serialize: function(model) {
    return {page_id: model.page_id};
  }
});

Discourse.KbGlyprobsPageController = Ember.ObjectController.extend({
  // loading is initially true
  loading: true
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
