Discourse.KbObjNewController = Ember.ObjectController.extend(Discourse.ModalFunctionality, {
  needs: "kbObjPage",

  flashMessage: null,

  saving: false,

  dataType: function() {
    return this.get('controllers.kbObjPage.data_type');
  }.property('controllers.kbObjPage.data_type'),

  save: function() { var self = this;
    this.set('saving', true);
    this.get('model').save().then(function (data) {
      self.set('saving', false);
    },function (resp) {
      self.set('saving', false);
    });
  }
});
