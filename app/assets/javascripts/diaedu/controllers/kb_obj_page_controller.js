Discourse.KbObjPageController = Discourse.ObjectController.extend({
  needs: 'kbObj',
  
  // loading is initially true
  loading: true,

  // will be set in setupController
  data_type: null,

  // filter set is the set of filter blocks on the left
  filterSet: null,

  iconPath: function() {
    return '/assets/diaedu/' + this.get('data_type').shortName + '-active.png';
  }.property('data_type'),

  addLinkText: function() {
    return I18n.t('kb.' + this.get('data_type.shortName') + '.add_link');
  }.property('data_type'),

  updateTitle: function() {
    Discourse.set('title', I18n.t('kb.' + this.get('data_type.shortName') + '.title'));
  }.observes('data_type')
});
