Discourse.KbObjPageController = Discourse.ObjectController.extend({
  needs: ["application", "kbObj"],

  showMode: function() {
    return this.get('controllers.application.currentPath') == 'kb_obj.show';
  }.property('controllers.application.currentPath'),

  // loads the specified page into the model
  changePage: function(newPage) { var self = this;
    // start fetch and get promise
    Discourse.KbObjPage.find(this.get('model.data_type'), newPage, this.get('model.filter_params'))
    .done(function(loaded){
      self.set('model', loaded);
    
    }).fail(function(resp){
      console.log("FETCH ERROR:", resp)
    });
  }
});
