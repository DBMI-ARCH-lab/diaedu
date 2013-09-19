Discourse.KbRelatedObjView = Discourse.View.extend({
  template: '',

  // observe when options get added to the select. wait for then to setup the multiselect
  didInsertElement: function() { var self = this;
    this.get('controller.glyprobChoices')().then(function(choices){
      // build and insert the select tag and option tags
      var sel = $('<select>').attr('multiple', 'multiple');
      choices.forEach(function(c){ $('<option>').attr('value', c.id).text(c.name).appendTo(sel); });
      self.$().append(sel);

      // setup multiselect control
      self.$('select').multiselect();
    });
  }.observes('controller.glyprobChoices')
});