Discourse.KbObjFilteredPageController = Discourse.ObjectController.extend({
  needs: 'kbObj',

  // loading is initially true
  loading: true,

  // the KbFilterSet of filter blocks on the left
  filterSet: null,

  // the KbObjPage that gets displayed
  objPage: null,

  dataType: function() {
    return this.get('controllers.kbObj.model');
  }.property('controllers.kbObj.model'),

  addLinkText: function() {
    return I18n.t('diaedu.' + this.get('dataType.shortName') + '.add_link');
  }.property('dataType')
});
