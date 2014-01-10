Discourse.KbRelatedObjView = Discourse.View.extend({
  classNames: ['related-obj-view'],

  // template is initially empty
  template: '',

  // observe when related objPage is populated and build multiselect using it
  setupMultiselect: function() { var self = this;

    // build and insert the select tag and option tags
    var sel = $('<select>').attr('multiple', 'multiple');

    self.get('controller.objPage.objs').forEach(function(o){
      var opt = $('<option>').attr('value', o.id).text(o.name);

      // make the option selected if it matches the preselected parent
      if (self.get('controller.model.preselectedParent.id') == o.id)
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
      self.set('controller.model.inlinkIds', sel.val());
    });

  }.observes('controller.objPage')

});