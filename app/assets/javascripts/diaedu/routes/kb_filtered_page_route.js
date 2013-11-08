Discourse.KbFilteredPageRoute = Discourse.Route.extend({
  model: function(params) {
    // on first load, create empty shell that will be updated by setupController
    return Discourse.KbObjPage.create({page_id: params.page_id, filter_params: params.filter_params});
  },

  setupController: function(controller, model) {
    // let the view know we are loading
    controller.set('loading', true);

    // get the data type
    var data_type = this.modelFor('kb_obj');

    // set the page title
    Discourse.set('title', data_type.get('title'));

    // reset the model before loading
    controller.set('objPage', null);
    
    // start fetch and get promise
    var promises = {
      objPage: Discourse.KbObjPage.find(data_type, model.page_id, model.filter_params)
    };

    // set objPage on controller when loaded
    promises.objPage.then(function(op){ controller.set('objPage', op); });

    // get current filter set (may be null)
    var currentFilterSet = controller.get('filterSet');

    // unless filter set matches current data type and filter_params, need to change it
    if (!currentFilterSet || !currentFilterSet.matches(data_type, model.filter_params)) {

      controller.set('filterSet', null);
      
      // start fetch and get promise
      promises.filterSet = Discourse.KbFilterSet.generate(data_type, model.filter_params);
      
      // set filterSet on model when loaded
      promises.filterSet.then(function(fs){ controller.set('filterSet', fs); });
    }

    // when everything is loaded, turn off the indicator
    Ember.RSVP.hash(promises).then(function(){ controller.set('loading', false); });
  },

  serialize: function(model) {
    return {data_type: this.modelFor('kb_obj').name, page_id: model.page_id, filter_params: model.filter_params};
  },

  actions: {
    addObj: function() {
      var dataType = this.modelFor('kb_obj');

      // create new model for modal
      var model = dataType.get('modelClass').create();

      // show the modal
      Discourse.Route.showModal(this, 'kbObjNew', model);
    }
  }

});
