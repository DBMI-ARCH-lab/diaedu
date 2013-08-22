Discourse.Route.buildRoutes(function() {
  var router = this;
  this.route('kb_home', {path: '/kb'});
  this.resource('kb_glyprobs', {path: '/kb/glycemic-problems'}, function() {
    this.route("page", { path: "page/:page_id" });
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
  model: function(params) {
    this.controllerFor('kb_glyprobs').set('selectedPage', 1);
    return Discourse.KbGlyprob.findAll();
  },
  renderTemplate: function() {
    this.render('diaedu/templates/glyprobs/index');
  }
});

Discourse.KbGlyprobsPageRoute = Discourse.Route.extend({
  model: function(params) {
    return Ember.Object.create({id: params.page_id});
  },
  setupController: function(controller, model) {
    this.controllerFor('kb_glyprobs').set('selectedPage', model.get('id'));
  }
});

Discourse.KbGlyprobsController = Ember.ArrayController.extend(Ember.PaginationMixin, {  
  itemsPerPage: 10
});

Discourse.PaginationView = Ember.View.extend({
    templateName: 'diaedu/templates/glyprobs/pagination',
    tagName: 'td',

    page: function() {
        return Ember.Object.create({id: this.get('content.page_id')});
    }.property()
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