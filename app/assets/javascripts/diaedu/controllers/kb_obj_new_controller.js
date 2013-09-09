Discourse.KbObjNewController = Ember.ObjectController.extend(Discourse.ModalFunctionality, {
  needs: "kbObjPage",

  flashMessage: null,

  saving: false,

  dataType: function() {
    return this.get('controllers.kbObjPage.data_type');
  }.property('controllers.kbObjPage.data_type'),

  save: function() { var self = this;
    this.set('saving', true);
    this.get('model').save().done(function(data) {
      // hide the modal
      self.send('closeModal');

      // transition to the page where the new obj should be living
      var objPage = Discourse.KbObjPage.create({page_id: data.page, filter_params: 'all'});
      self.transitionToRoute('kb_obj_page.index', self.get('dataType'), objPage);

    }).always(function() {
      // always turn off the loading indicator
      self.set('saving', false);
    });
  }
});
