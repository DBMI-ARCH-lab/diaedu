Discourse.KbObjShowWithBreadcrumbRoute = Discourse.Route.extend({
  model: function(params, transition) {
    var obj = this.modelFor('kbObj').get('modelClass').create({id: params.id});

    // reconstruct breadcrumb from params
    obj.set('breadcrumb', Discourse.KbBreadcrumb.reconstruct(obj, params.breadcrumb));

    return obj;
  },
  
  setupController: function(controller, model) {
    // let the view know we are loading
    controller.set('loading', true);

    var dataType = model.get('dataType');

    // set title to something basic while loading
    Discourse.set('title', model.get('dataType').get('title'));

    // initiate ajax request to populate object details
    var promises = {
      obj: model.loadFully()
    };

    // initiate request for associated objects (if applicable -- not applicable for goals (rank 3))
    if (dataType.get('hasNext')) {

      // build a filter string to get objs related to this obj
      var filterParams = dataType.get('shortName') + '-' + model.get('id');
      
      // setup promises
      promises.related = Discourse.KbObjPage.find(dataType.get('next'), 1, filterParams);
      promises.filterSet = Discourse.KbFilterSet.generate(dataType.get('next'), filterParams);
    }

    // when all requests are complete
    Ember.RSVP.hash(promises).then(function(results){

      controller.set('model', model);

      if (results.related) {
        // add current breadcrumb to all related obj breadcrumbs
        results.related.get('objs').forEach(function(obj){ obj.get('breadcrumb').merge(model.get('breadcrumb')); })
        controller.set('relatedObjPage', results.related);
      }

      // find the filter block for tags
      if (results.filterSet) {
        var tagBlock = results.filterSet.get('blocks').filter(function(b){ return b.get('type') == 'tags'; })[0];
        controller.set('tagFilterBlock', tagBlock);
      }

      // refine title now that we've loaded
      Discourse.set('title', model.get('name'));

      controller.set('loading', false);
    });
  },

  renderTemplate: function() {
    this.render('diaedu/templates/kb_objs/show');
  },

  serialize: function(model) {
    return {id: model.id, data_type: model.get('dataType.name'), breadcrumb: model.get('breadcrumb.serialized')};
  },

  actions: {
    // loads the modal dialog to create a related object
    addRelatedObj: function() {
      // create new model for modal
      var model = this.get('controller.model.dataType.next.modelClass').create();

      // the model should have the proper obj preselected
      model.set('preselectedParentId', this.get('controller.model.id'));

      // show the modal
      Discourse.Route.showModal(this, 'kbObjNew', model);
    },

    // ensures that there is an existing topic for this object, then sends the user to the page for that topic
    jumpToComments: function() { var self = this;
      self.get('controller').set('loading', true);
      
      // get topic and do transition
      self.get('controller.model').getTopic().then(function(topic){
        self.transitionTo('topic.fromParams', topic);
        self.get('controller').set('loading', false);
      });
    }
  }
});
