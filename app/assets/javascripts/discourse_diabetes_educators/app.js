(function() {
  $("body").prepend(
    '<div class="banner">' + 
      '<img src="/assets/discourse_diabetes_educators/top-logo.png" />' +
      '<h1>Diabetes Educator Community</h1>' +
    '</div>'+
    '<nav class="kb-main">' + 
      '<a href="/kb" class="active">Knowledge Base</a>' +
      '<a href="/">Community</a>' +
      '<a href="/kb/about">About</a>' +
    '</nav>'
  );
}).call(this);

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

$(document).ready(function(){
  $('nav.kb-main a').click(function(e){
    $('nav.kb-main a').removeClass('active');
    $(e.target).addClass('active');
    Ember.Instrumentation.instrument("kb.bannerLinkClicked", $(e.target).attr('href')); 
    e.preventDefault();
  });
});

Discourse.KbHomeController = Ember.Controller.extend({
  goToPage: function(link) {
    $('header.d-header')[link == '/' ? 'show' : 'hide']();
    $('div#main-outlet').css('padding-top', link == '/' ? '75px' : '0');
    this.transitionTo(link);
  }
});

Discourse.KbHomeRoute = Discourse.Route.extend({
  setupController: function(controller, model) {
    Ember.Instrumentation.subscribe("kb.bannerLinkClicked", {
      before: function(name, timestamp, payload) {
        controller.send('goToPage', payload);
      },
      after: function() {}
    });
  },

  renderTemplate: function() {
    this.render('discourse_diabetes_educators/templates/home/index');
  }
});

Discourse.KbGlycprobsRoute = Discourse.Route.extend({
  renderTemplate: function() {
    this.render('discourse_diabetes_educators/templates/glycprobs/index');
  }
});

Discourse.KbTriggersRoute = Discourse.Route.extend({
  renderTemplate: function() {
    this.render('discourse_diabetes_educators/templates/triggers/index');
  }
});

Discourse.KbGoalsRoute = Discourse.Route.extend({
  renderTemplate: function() {
    this.render('discourse_diabetes_educators/templates/goals/index');
  }
});

