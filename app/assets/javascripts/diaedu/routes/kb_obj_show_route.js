Discourse.KbObjShowRoute = Discourse.Route.extend({
  model: function(params, transition) {
    // since this method won't always be called, just return a placeholder indicating the ID
    return Discourse.KbObj.create({id: params.id, dataType: this.modelFor('kbObj')});
  },
  
  setupController: function(controller, model) {
    
    // let the view know we are loading
    controller.set('loading', true);
    controller.set('loaded', false);
    controller.set('loadFailed', false);

    var dataType = this.modelFor('kbObj');

    // set title to something basic while loading
    Discourse.set('title', this.modelFor('kbObj').get('title'));

    // initiate ajax request for object
    var objReq = Discourse.KbObj.find({id: model.id, dataType: dataType});

    // initiate request for associated objects (if applicable -- not applicable for goals (rank 3))
    if (dataType.rank < 3) {
      // build a filter string to get objs related to this obj
      var filterParams = dataType.shortName + '-' + model.id;
      var relatedReq = Discourse.KbObjPage.find(dataType.get('next'), 1, filterParams);
    }
    else {
      var relatedReq = $.Deferred();
      relatedReq.resolve();
    }

    $.when(objReq, relatedReq)

    // if both requests are done, we can proceed
    .done(function(obj, related){
      // setup the models
      controller.set('model', obj);
      controller.set('relatedObjPage', related);

      // refine title now that we've loaded
      Discourse.set('title', obj.get('name'));

      // for glyprobs, start the breadcrumb trail off with self
      if (dataType.get('shortName') == 'glyprobs')
        controller.set('model.breadcrumb', Ember.A([
          {type: Discourse.KbDataType.get('glycemic-problems'), obj: obj},
          {type: Discourse.KbDataType.get('triggers'), obj: null},
          {type: Discourse.KbDataType.get('goals'), obj: null}
        ]));

      controller.set('loaded', true);

    // if either request fails, we say load failed
    }).fail(function(resp, dummyObj){
      controller.set('loadFailed', true);

      // set a dummy model so that a try again link can be generated
      controller.set('model', dummyObj);
      
      console.log('LOAD FAILED', resp);

    // in either case, we can turn off the loading indicator
    }).always(function(){
      controller.set('loading', false);
    });
  },

  renderTemplate: function() {
    this.render('diaedu/templates/kb_objs/show');
  },

  serialize: function(model) {
    return {id: model.id, data_type: model.get('dataType.name')};
  }
});
