Discourse.Route.buildRoutes(function() {
  var router = this;
  this.route('kb_home', {path: '/kb'});

  this.resource('kb_obj', {path: '/kb/:data_type'}, function() {
    this.route('show', {path: '/:id'});
    this.route('show_with_breadcrumb', {path: '/:id/:breadcrumb'});
    this.route('filtered_page', {path: '/:filter_params/page/:page_id'});
  });

  this.route('kb_filter_set');
});