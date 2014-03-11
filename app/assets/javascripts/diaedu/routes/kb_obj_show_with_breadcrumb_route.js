Discourse.KbObjShowWithBreadcrumbRoute = Discourse.Route.extend({
  model: function(params, transition) {
    var obj = this.modelFor('kbObj').get('modelClass').create({id: params.id});

    // reconstruct breadcrumb from params
    obj.set('breadcrumb', Discourse.KbBreadcrumb.reconstruct(params.breadcrumb).add(obj));

    return obj;
  },

  setupController: function(controller, model) {
    // let the view know we are loading
    controller.set('loading', true);

    // set title to something basic while loading
    Discourse.set('title', model.get('dataType.title'));

    // initiate ajax request to populate object details
    model.loadFully().then(function() {

      controller.set('model', model);

      // refine title now that we've loaded
      Discourse.set('title', model.get('name'));

      controller.set('loading', false);
    });
  },

  renderTemplate: function() {
    this.render('javascripts/diaedu/templates/show_with_breadcrumb');
  },

  serialize: function(model) {
    return {id: model.get('id'), dataType: model.get('dataType.name'), breadcrumb: model.get('breadcrumb.serialized')};
  },

  actions: {
    // loads the modal dialog to create a related object
    // this should REALLY be in KbRelatedGroupController but couldn't figure out how to get a reference to this Route from there
    // and Discourse.Route.showModal needs such a reference
    showAddModal: function(relatedGroup) { var self = this;
      // create new model for modal
      var model = relatedGroup.get('dataType.modelClass').create();

      // the model should have the proper obj preselected
      model.set('preselectedParent', self.get('controller.model'));

      // show the modal
      Discourse.Route.showModal(self, 'kbObjNew', model);
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
