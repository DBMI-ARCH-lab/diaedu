Discourse.KbObjNewController = Ember.ObjectController.extend(Discourse.ModalFunctionality, {
  needs: "kbObjPage",

  flashMessage: null,

  dataType: function() {
    return this.get('controllers.kbObjPage.data_type');
  }.property('controllers.kbObjPage.data_type')
});
