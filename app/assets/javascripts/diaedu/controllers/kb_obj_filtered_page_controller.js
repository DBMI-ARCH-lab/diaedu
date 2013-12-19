Discourse.KbObjFilteredPageController = Discourse.ObjectController.extend({
  needs: 'kbObj',

  // loading is initially true
  loading: true,

  // the KbFilterSet of filter blocks on the left
  filterSet: null,

  // the KbObjPage that gets displayed
  objPage: null,

  data_type: function() {
    return this.get('controllers.kbObj.model');
  }.property('controllers.kbObj.model'),

  addLinkText: function() {
    return I18n.t('diaedu.' + this.get('data_type.shortName') + '.add_link');
  }.property('data_type')
});
