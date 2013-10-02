Discourse.KbObjShowRoute = Discourse.Route.extend({
  model: function(params, transition) {
    // since this method won't always be called, just return a placeholder indicating the ID
    return this.modelFor('kbObj').get('modelClass').create({id: params.id});
  },
  
  setupController: function(controller, model) {
    
    // let the view know we are loading
    controller.set('loading', true);
    controller.set('loaded', false);
    controller.set('loadFailed', false);

    var dataType = model.get('dataType');

    // set title to something basic while loading
    Discourse.set('title', model.get('dataType').get('title'));

    // initiate ajax request for object
    var objReq = Discourse.KbObj.find({id: model.id, dataType: dataType, navParent: model.navParent});

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
      // setup the model
      controller.set('model', obj);
      
      if (related) {
        controller.set('relatedObjPage', related);
        // set the nav parent on all the related objs
        related.setNavParent(obj);
      }

      // find the filter block for tags
      if (filterSet) {
        var tagBlock = filterSet.get('blocks').filter(function(b){ return b.get('type') == 'tags'; })[0];
        controller.set('tagFilterBlock', tagBlock);
      }

      // refine title now that we've loaded
      Discourse.set('title', obj.get('name'));

      controller.set('loaded', true);

    // if any request fails, we say load failed
    }).fail(function(resp, dummyObj){
      controller.set('loadFailed', true);

      // set a dummy model so that a try again link can be generated
      controller.set('model', dummyObj);
      
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
    return {id: model.id, data_type: model.get('dataType.name')};
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
