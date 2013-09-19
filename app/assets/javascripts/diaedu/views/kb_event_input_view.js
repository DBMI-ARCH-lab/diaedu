// models a box for inputting an event, with autocomplete
Discourse.KbEventInputView = Discourse.View.extend({
  templateName: 'diaedu/templates/kb_glyprobs/event_input',

  didInsertElement: function() { var self = this;
    this.$('input').autocomplete2({source: '/kb/events/suggest'})

    // do custom render to highlight matching portion
    .data( "ui-autocomplete2" )._renderItem = function( ul, item ) {

      // replace all occurrences of val (case insensitive) with boldified version
      var val = self.$('input').val();
      var lbl = item.label.replace(new RegExp(val, 'gi'), function(m) { return '<strong>' + m + '</strong>'; });

      // build and append <li>
      return $('<li>').append('<a>' + lbl + '</a>').appendTo(ul);
    };
  }
  
});