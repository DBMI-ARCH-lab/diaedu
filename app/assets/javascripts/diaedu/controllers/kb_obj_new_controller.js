// controller for the new object modal
Discourse.KbObjNewController = Discourse.ObjectController.extend(Discourse.ModalFunctionality, {
  // whether the submission process is complete
  done: false,

  flashMessage: null,

  saving: false,

  objPage: null,

  relatedHeading: function() { var self = this;
    return I18n.t('diaedu.' + self.get('model.preferredParentDataType.shortName') + '.related_heading');
  }.property('model.preferredParentDataType'),

  onShow: function() { var self = this;
    self.set('done', false);

    // get the parent's datatype and request an obj page
    var dataType = self.get('model.preferredParentDataType');
    if (dataType)
      Discourse.KbObjPage.find({dataType: dataType, filterParams: 'all', pageNum: 1, perPage: 1000000000}).then(function(objPage){
        self.set('objPage', objPage);
      });
  },

  actions: {
    save: function() { var self = this;
      self.set('saving', true);
      self.get('model').save().then(function(success) {
        // set the done variable so the modal changes
        if (success) self.set('done', true);

        // turn off the loading indicator
        self.set('saving', false);
      });
    }
  }
});
