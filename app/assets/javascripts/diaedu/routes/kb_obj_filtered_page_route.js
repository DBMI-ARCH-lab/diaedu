Discourse.KbObjFilteredPageRoute = Discourse.Route.extend(Discourse.KbLoginRedirectable, {
  model: function(params) {
    // on first load, create empty shell that will be updated by setupController
    return Discourse.KbObjPage.create({pageId: parseInt(params.pageId), filterParams: params.filterParams});
  },

  setupController: function(controller, model) {
    // let the view know we are loading
    controller.set('loading', true);

    // get the data type
    var dataType = this.modelFor('kbObj');

    // set the page title
    Discourse.set('title', dataType.get('title'));

    // reset the model before loading
    controller.set('objPage', null);

    // start fetch and get promise
    var promises = {
      objPage: Discourse.KbObjPage.find({dataType: dataType, pageNum: model.get('pageId'), filterParams: model.get('filterParams')})
    };

    // set objPage on controller when loaded
    promises.objPage.then(function(op){ controller.set('objPage', op); });

    // get current filter set (may be null)
    var currentFilterSet = controller.get('filterSet');

    // unless filter set matches current data type and filterParams, need to change it
    if (!currentFilterSet || !currentFilterSet.matches(dataType, model.filterParams)) {

      controller.set('filterSet', null);

      // start fetch and get promise
      promises.filterSet = Discourse.KbFilterSet.generate(dataType, model.filterParams);

      // set filterSet on model when loaded
      promises.filterSet.then(function(fs){ controller.set('filterSet', fs); });
    }

    // when everything is loaded, turn off the indicator
    Ember.RSVP.hash(promises).then(function(){ controller.set('loading', false); });
  },

  serialize: function(model) {
    return {dataType: this.modelFor('kbObj').name, pageId: model.pageId, filterParams: model.filterParams};
  },

  renderTemplate: function() {
    this.render('javascripts/diaedu/templates/filtered_page');
  },

  actions: {
    addObj: function() {
      var dataType = this.modelFor('kbObj');

      // create new model for modal
      var model = dataType.get('modelClass').create();

      // show the modal
      Discourse.Route.showModal(this, 'kbObjNew', model);
    }
  }

});
