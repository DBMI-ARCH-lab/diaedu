Discourse.Route.buildRoutes(function() {
  var router = this;
  this.route('kb_home', {path: '/kb'});

  // TODO this should really be called kb_data_type route
  this.resource('kb_obj', {path: '/kb/:data_type'}, function() {
    this.resource('kb_obj_show', {path: '/:id'}, function() {
      this.route('with_breadcrumb', {path: '/:breadcrumb'});
    });
    this.resource('kb_filtered_page', {path: '/:filter_params/page/:page_id'}, function() {
      this.route('index', {path: '/'});
    });
  });

  this.route('kb_filter_set');
});