Discourse.KbFilterSetController = Ember.ObjectController.extend({
  needs: 'kb_obj',

  // handles changes to the filter set
  filterChanged: function() {

    // serialize the current filter set
    var new_filter_params = this.get('model').serialize();

    // get current data type from the kb_obj controller
    var data_type = this.get('controllers.kb_obj.content');

    // build new obj page shell (objs to be fetched by obj page route)
    var obj_page = Discourse.KbObjPage.create({page_id: 1, filter_params: new_filter_params})

    // transition to new filter results
    this.transitionToRoute('kb_obj_page.index', data_type, obj_page);
  }
});
