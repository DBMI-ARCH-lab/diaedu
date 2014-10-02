Discourse.KbRelatedObjView = Discourse.View.extend({
  classNames: ['related-obj-view'],

  // template is initially empty
  template: '',

  didInsertElement: function() { var self = this;
    // for some reason this needs to be here else the observer below never fires
    self.get('controller');
  },

  // when the obj new view is shown, an ajax request is issued to get the options for the related object list (this view)
  // so we observe when the controller's objPage is populated and build multiselect using it
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