Discourse.KbRelatedObjView = Discourse.View.extend({
  classNames: ['related-obj-view'],

  template: '',

  didInsertElement: function() { var self = this;
    // relatedParents is a lazy-loaded value, which means when we run this method it will trigger an ajax request
    // and return a temporary value. the method below will pickup the change in the value when it is fully loaded.
    self.get('controller.model.relatedParents');
  },

  // observe when related parents array is populated and build multiselect using it
  setupMultiselect: function() { var self = this;
    // build and insert the select tag and option tags
    var sel = $('<select>').attr('multiple', 'multiple');

    this.get('controller.model.relatedParents').forEach(function(c){
      var opt = $('<option>').attr('value', c.id).text(c.name)

      // make the option selected if it matches the preselected parent
      if (self.get('controller.preselectedParentId') == c.id)
        opt.attr('selected', 'selected');

      opt.appendTo(sel);
    });
    self.$().empty().append(sel);

    // setup multiselect control
    sel.multiselect({
      noneSelectedText: '',
      height: 250
    }).multiselectfilter();

    // setup event to copy changes to model
    sel.on('change', function() {
      self.set('controller.inlink_ids', sel.val());
    });

  }.observes('controller.model.relatedParents')

});