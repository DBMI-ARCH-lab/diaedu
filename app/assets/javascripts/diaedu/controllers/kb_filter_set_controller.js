Discourse.KbFilterSetController = Ember.ObjectController.extend({
  // handles changes to the filter set
  filterChanged: function() {
    // serialize the current filter set
    var filter_params = this.get('model').serialize();
  }
});
