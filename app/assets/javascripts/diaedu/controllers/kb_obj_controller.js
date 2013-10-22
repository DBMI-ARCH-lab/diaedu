// controller for root of kb_obj nested routes. see other kb_obj_* controllers for more interesting stuff
Discourse.KbObjController = Ember.ObjectController.extend({
  // ID of an object to highlight in the index
  toHighlight: null
});