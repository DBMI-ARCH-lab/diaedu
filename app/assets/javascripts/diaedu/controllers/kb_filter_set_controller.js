Discourse.KbFilterSetController = Ember.ObjectController.extend({
  needs: 'kbObj',

  // handles changes to the filter set
  filterChanged: function() {

    // serialize the current filter set
    var newFilterParams = this.get('model').serialize();

    // get current data type from the kb_obj controller
    var dataType = this.get('controllers.kbObj.model');

    // build new obj page shell (objs to be fetched by obj page route)
    var objPage = Discourse.KbObjPage.create({page_id: 1, filter_params: newFilterParams})

    // transition to new filter results
    this.transitionToRoute('kb_obj_page.index', dataType, objPage);
  }
});
