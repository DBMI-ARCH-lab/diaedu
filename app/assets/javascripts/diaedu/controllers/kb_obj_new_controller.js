Discourse.KbObjNewController = Ember.ObjectController.extend(Discourse.ModalFunctionality, {
  needs: ["kbObj"],

  // whether the submission process is complete
  done: false,

  flashMessage: null,

  saving: false,

  dataType: function() {
    return this.get('controllers.kbObj.model');
  }.property('controllers.kbObj'),

  onShow: function() {
    this.set('done', false);
  },

  save: function() { var self = this;
    this.set('saving', true);
    this.get('model').save().done(function(data) {
      // set the done variable so the modal changes
      self.set('done', true);

    }).always(function() {
      // always turn off the loading indicator
      self.set('saving', false);
    });
  }
});
