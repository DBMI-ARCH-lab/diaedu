Discourse.KbObjController = Ember.ObjectController.extend({
  // ID of an object to highlight in the index
  toHighlight: null,

  iconPath: function() {
    return '/assets/diaedu/' + this.get('model.shortName') + '-active.png';
  }.property('model.shortName'),
});