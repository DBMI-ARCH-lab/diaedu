Discourse.KbObjShowWithBreadcrumbRoute = Discourse.Route.extend({
  model: function(params, transition) {
    return this.modelFor('kbObjShow');
  },
  
  setupController: function(controller, model) {
    // let the view know we are loading
    controller.set('loading', true);
    controller.set('loaded', false);
    controller.set('loadFailed', false);

    var dataType = model.get('dataType');

    // set title to something basic while loading
    Discourse.set('title', model.get('dataType').get('title'));

    // initiate ajax request to populate object details
    var objReq = model.loadFully();

    // initiate request for associated objects (if applicable -- not applicable for goals (rank 3))
    if (dataType.get('hasNext')) {
      // build a filter string to get objs related to this obj
      var relatedFilterParams = dataType.get('shortName') + '-' + model.get('id');
      var relatedReq = Discourse.KbObjPage.find(dataType.get('next'), 1, relatedFilterParams);
      var filterReq = Discourse.KbFilterSet.generate(dataType.get('next'), relatedFilterParams);
    } else {
      var relatedReq = $.Deferred();
      relatedReq.resolve(null);
      var filterReq = $.Deferred();
      filterReq.resolve(null);
    }
  
    $.when(objReq, relatedReq, filterReq)

    // if all requests are done, we can proceed
    .done(function(obj, related, filterSet){

      controller.set('model', model);

      if (related) {
        // add current obj to all related obj breadcrumbs
        related.addToBreadcrumbs(model);

        controller.set('relatedObjPage', related);
      }

      // find the filter block for tags
      if (filterSet) {
        var tagBlock = filterSet.get('blocks').filter(function(b){ return b.get('type') == 'tags'; })[0];
        controller.set('tagFilterBlock', tagBlock);
      }

      // refine title now that we've loaded
      Discourse.set('title', model.get('name'));

      controller.set('loaded', true);

    // if any request fails, we say load failed
    }).fail(function(resp){
      controller.set('loadFailed', true);

      console.log('LOAD FAILED', resp);

    // in any case, we can turn off the loading indicator
    }).always(function(){
      controller.set('loading', false);
    });
  },

  renderTemplate: function() {
    this.render('diaedu/templates/kb_objs/show');
  },

  serialize: function(model) {
    return {id: model.id, data_type: model.get('dataType.name'), breadcrumb: model.get('breadcrumb.serialized')};
  },

  events: {
    // loads the modal dialog to create a related object
    addRelatedObj: function() {
      // create new model for modal
      var model = this.get('controller.model.dataType.next.modelClass').create();

      // the model should have the proper obj preselected
      model.set('preselectedParentId', this.get('controller.model.id'));

      // show the modal
      Discourse.Route.showModal(this, 'kbObjNew', model);
    }
  }
});
