Discourse.KbLinkToKbButtonView = Discourse.ButtonView.extend({
  text: I18n.t('diaedu.view_in_kb'),
  title: I18n.t('diaedu.view_in_kb_title'),
  hidden: true,

  /* initially hidden until we can check if this is a kb related post */
  classNameBindings: ['hidden'],

  click: function(topic) { var self = this;
    // transition to the linked object's show action
    var obj = self.get('controller.kbObj');
    self.get('controller').transitionToRoute('kbObj.showWithBreadcrumb', obj.get('dataType'), obj);
  },

  didInsertElement: function() { var self = this;
    // fetch the kb obj related to this topic (if available)
    // I feel like this should really be done in the controller but couldn't figure out an appropriate thing to hook on to
    Discourse.KbObj.findByTopicId(self.get('controller.topic.id')).then(function(obj){
      // store in controller
      self.set('controller.kbObj', obj);

      // set hidden depending on if null
      self.set('hidden', obj === null);
    });
  },

  renderIcon: function(buffer) { var self = this;
    buffer.push("<i class='fa fa-eye-open'></i>");
  }
});

// this code should be uncommented and updated when a proper plugin hook is setup
// Discourse.TopicFooterButtonsView.reopen({
//   addAlertButton: function() {
//     this.attachViewClass(Discourse.KbLinkToKbButtonView);
//   }.on("additionalButtons")
// });