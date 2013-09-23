Discourse.KbFilteredPageController = Discourse.ObjectController.extend({
  needs: 'kbObj',
  
  // loading is initially true
  loading: true,

  // filter set is the set of filter blocks on the left
  filterSet: null,

  objPage: null,

  data_type: function() {
    return this.get('controllers.kbObj.model');
  }.property('controllers.kbObj.model'),

  addLinkText: function() {
    return I18n.t('kb.' + this.get('data_type.shortName') + '.add_link');
  }.property('data_type')
});
