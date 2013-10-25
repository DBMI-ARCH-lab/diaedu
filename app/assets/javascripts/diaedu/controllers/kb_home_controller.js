// controller for the knowledge base home page
Discourse.KbHomeController = Ember.ObjectController.extend({
  // gets the first data type in the set
  initialDataType: function() {
    return Discourse.KbDataType.get(0);
  }.property()
});