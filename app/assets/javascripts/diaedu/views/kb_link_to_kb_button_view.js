Discourse.KbLinkToKbButtonView = Discourse.ButtonView.extend({
  text: I18n.t('diaedu.view_in_kb'),
  title: I18n.t('diaedu.view_in_kb_title'),

  /* initially hidden */
  /* classNames: ['hidden'] */,

  click: function(topic) { var self = this;
    var kb_obj = Discourse.KbGlyprob.create({id: 50});
    self.get('controller').transitionToRoute('kb_obj.show_with_breadcrumb', kb_obj.get('dataType'), kb_obj);
  },

  renderIcon: function(buffer) { var self = this;
    buffer.push("<i class='icon icon-eye-open'></i>");
  }
});

// this code should be uncommented and updated when a proper plugin hook is setup
// Discourse.TopicFooterButtonsView.reopen({
//   addAlertButton: function() {
//     this.attachViewClass(Discourse.KbLinkToKbButtonView);
//   }.on("additionalButtons")
// });