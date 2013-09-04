Discourse.KbObjPageController = Ember.ObjectController.extend({
  // loading is initially true
  loading: true,

  // will be set in setupController
  data_type: null,

  // filter set is the set of filter blocks on the left
  filterSet: null,

  iconPath: function() {
    return '/assets/diaedu/' + this.get('data_type').shortName + '-active.png';
  }.property('data_type')
});
