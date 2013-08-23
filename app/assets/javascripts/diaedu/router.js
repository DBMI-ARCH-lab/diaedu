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
