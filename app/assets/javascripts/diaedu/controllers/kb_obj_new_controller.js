// controller for the new object modal
Discourse.KbObjNewController = Discourse.ObjectController.extend(Discourse.ModalFunctionality, {
  // whether the submission process is complete
  done: false,

  flashMessage: null,

  saving: false,

  onShow: function() {
    this.set('done', false);
  },

  actions: {
    save: function() { var self = this;
      this.set('saving', true);
      this.get('model').save().then(function(success) {
        // set the done variable so the modal changes
        if (success) self.set('done', true);
        
        // turn off the loading indicator
        self.set('saving', false);
      });
    }
  }
});
