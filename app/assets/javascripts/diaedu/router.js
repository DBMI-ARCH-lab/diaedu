Discourse.Route.buildRoutes(function() {
  var router = this;
  this.route('kbHome', {path: '/kb'});

  this.resource('kbObj', {path: '/kb/:dataType'}, function() {
    this.route('show', {path: '/:id'});
    this.route('showWithBreadcrumb', {path: '/:id/:breadcrumb'});
    this.route('filteredPage', {path: '/:filterParams/page/:pageId'});
  });

  this.route('kbFilterSet');
});