Discourse.KbObjNewController = Ember.ObjectController.extend(Discourse.ModalFunctionality, {
  needs: ["kbObjPage", "kbObj"],

  // whether the submission process is complete
  done: false,

  flashMessage: null,

  saving: false,

  dataType: function() {
    return this.get('controllers.kbObjPage.data_type');
  }.property('controllers.kbObjPage.data_type'),

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
