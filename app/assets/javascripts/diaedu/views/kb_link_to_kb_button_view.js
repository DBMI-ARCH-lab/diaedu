Discourse.KbLinkToKbButtonView = Discourse.ButtonView.extend({
  text: I18n.t('diaedu.view_in_kb'),
  title: I18n.t('diaedu.view_in_kb_title'),

  click: function(topic) {

  },

  renderIcon: function(buffer) {
    buffer.push("<i class='icon icon-eye-open'></i>");
  }
});

// this code should be uncommented and updated when a proper plugin hook is setup
// Discourse.TopicFooterButtonsView.reopen({
//   addAlertButton: function() {
//     this.attachViewClass(Discourse.KbLinkToKbButtonView);
//   }.on("additionalButtons")
// });