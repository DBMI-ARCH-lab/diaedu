// controller for the paginated kb obj index
Discourse.KbObjPageController = Discourse.ObjectController.extend({
  needs: ["application", "kbObj", "kbObjShowWithBreadcrumb"],

  actions: {
    // loads the specified page into the model
    changePage: function(newPage) { var self = this;
      // use the same data type and filter params
      var dataType = this.get('model.data_type');
      var filterParams = this.get('model.filter_params');

      // set the model to null so the loading indicator shows up
      this.set('model', null);

      // start fetch and get promise
      Discourse.KbObjPage.find(dataType, newPage, filterParams)
      .done(function(loaded){

        // add current breadcrumb to all page obj breadcrumbs
        loaded.get('objs').forEach(function(obj){ obj.get('breadcrumb').merge(
          self.get('controllers.kbObjShowWithBreadcrumb.model.breadcrumb')
        ); });

        self.set('model', loaded);

      }).fail(function(resp){
        console.log("FETCH ERROR:", resp)
      });
    }
  },

  showMode: function() {
    return this.get('controllers.application.currentPath').match(/kb_obj_show/);
  }.property('controllers.application.currentPath'),

  // if model is null, we should show the loading indicator
  loading: function() {
    return !this.get('model');
  }.property('model')

});
