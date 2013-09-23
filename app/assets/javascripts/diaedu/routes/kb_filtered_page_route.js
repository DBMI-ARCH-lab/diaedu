Discourse.KbFilteredPageRoute = Discourse.Route.extend({
  model: function(params) {
    // on first load, create empty shell that will be updated by setupController
    return Discourse.KbObjPage.create({page_id: params.page_id, filter_params: params.filter_params});
  },

  setupController: function(controller, model) {
    // setup promise variables for multiple loading processes
    var modelLoaded = $.Deferred();
    var filterLoaded = $.Deferred();

    // let the view know we are loading
    controller.set('loading', true);

    // get the data type
    var data_type = this.modelFor('kb_obj');

    // set the page title
    Discourse.set('title', data_type.get('title'));

    // if the model is just a shell, populate it
    controller.set('objPage', null);
    // start fetch and get promise
    Discourse.KbObjPage.find(data_type, model.page_id, model.filter_params).then(function(loaded){
      controller.set('objPage', loaded);
      modelLoaded.resolve();
    }, function(e) {
      console.log("FETCH ERROR:", e.message)
    });

    // get current filter set (may be null)
    var currentFilterSet = controller.get('filterSet');

    // if filter set matches current data type and filter_params, no need to change it
    if (currentFilterSet && currentFilterSet.matches(data_type, model.filter_params)) {

      // in this case, resolve the promise so the loading indicator doesn't hang
      filterLoaded.resolve();

    } else {

      // if we get in here, we do need to rebuild the filter block, so do it
      controller.set('filterSet', null);
      
      // start fetch and get promise
      Discourse.KbFilterSet.generate(data_type, model.filter_params).then(function(filterSet){
        controller.set('filterSet', filterSet);
        filterLoaded.resolve();
      }, function(e) {
        console.log("FETCH ERROR:", e.message)
      });
    }

    // when everything is loaded, turn off the indicator
    $.when(modelLoaded, filterLoaded).done(function() { controller.set('loading', false); });
  },

  serialize: function(model) {
    return {data_type: this.modelFor('kb_obj').name, page_id: model.page_id, filter_params: model.filter_params};
  },

  events: {
    newObj: function() {
      var dataType = this.modelFor('kb_obj');

      // create new model for modal
      var model = Discourse.KbObj.generateForDataType(dataType);

      // show the modal
      Discourse.Route.showModal(this, 'kbObjNew', model);
    }
  }

});
