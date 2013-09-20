Discourse.KbObjShowRoute = Discourse.Route.extend({
  model: function(params, transition) {
    // since this method won't always be called, just return a placeholder indicating the ID
    return {id: params.id};
  },
  
  setupController: function(controller, model) {
    // let the view know we are loading
    controller.set('loading', true);

    var dataType = this.modelFor('kbObj');

    // fetch object
    Discourse.KbObj.find({id: model.id, dataType: dataType})
      .done(function(obj){
        controller.set('model', obj);

        // for glyprobs, start the breadcrumb trail off with self
        if (dataType.get('shortName') == 'glyprobs')
          controller.set('model.breadcrumb', Ember.A([obj]));

        controller.set('loaded', true);

      }).fail(function(resp, dummyObj){
        controller.set('loadFailed', true);

        // set a dummy model so that a try again link can be generated
        controller.set('model', dummyObj);
        
        console.log('LOAD FAILED', resp);

      }).always(function(){
        controller.set('loading', false);
      });
  },

  renderTemplate: function() {
    this.render('diaedu/templates/kb_objs/show');
  },

  serialize: function(model) {
    return {id: model.id};
  }
});
