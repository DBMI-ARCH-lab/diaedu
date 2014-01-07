Discourse.KbFilterSetView = Discourse.View.extend({
  templateName: 'javascripts/diaedu/templates/filter_set',

  // handle clicks on checkboxes
  click: function(e) {
    // send an event to the router if the click was on a checkbox
    if ($(e.target).is('.ember-checkbox'))
      this.get('controller').send('filterChanged');
  }
});