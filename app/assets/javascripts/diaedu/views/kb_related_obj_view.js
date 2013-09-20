Discourse.KbRelatedObjView = Discourse.View.extend({
  classNames: ['related-obj-view'],
  
  template: '',

  // observe when options get added to the select. wait for then to setup the multiselect
  didInsertElement: function() { var self = this;
    this.get('controller.relatedObjChoices').then(function(choices){
      // build and insert the select tag and option tags
      var sel = $('<select>').attr('multiple', 'multiple');
      choices.forEach(function(c){ $('<option>').attr('value', c.id).text(c.name).appendTo(sel); });
      self.$().append(sel);

      // setup multiselect control
      sel.multiselect({
        noneSelectedText: ''
      }).multiselectfilter();

      // setup event to copy changes to model
      sel.on('change', function() {
        self.set('controller.parent_ids', sel.val());
      });
    });
  },

});