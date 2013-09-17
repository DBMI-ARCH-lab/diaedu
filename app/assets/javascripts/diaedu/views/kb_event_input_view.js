// models a box for inputting an event, with autocomplete
Discourse.KbEventInputView = Discourse.View.extend({
  templateName: 'diaedu/templates/kb_glyprobs/event_input',

  didInsertElement: function() {
    this.$('input').autocomplete2({source: ["alpha", "bravo"]});
  }
});