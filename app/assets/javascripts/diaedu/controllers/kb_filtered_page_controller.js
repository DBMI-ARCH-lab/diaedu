Discourse.KbFilteredPageController = Discourse.ObjectController.extend({
  needs: 'kbObj',
  
  // loading is initially true
  loading: true,

  // will be set in setupController
  data_type: null,

  // filter set is the set of filter blocks on the left
  filterSet: null,

  objPage: null,

  addLinkText: function() {
    return I18n.t('kb.' + this.get('data_type.shortName') + '.add_link');
  }.property('data_type')
});
