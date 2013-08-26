Discourse.KbObjPageController = Ember.ObjectController.extend({
  // loading is initially true
  loading: true,

  // will be set in setupController
  data_type: null,

  iconPath: function() {
    return '/assets/diaedu/' + this.get('data_type').shortName + '-active.png';
  }.property('data_type')
});
