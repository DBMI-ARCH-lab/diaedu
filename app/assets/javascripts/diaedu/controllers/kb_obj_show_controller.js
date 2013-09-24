Discourse.KbObjShowController = Discourse.ObjectController.extend({
  needs: ["kbObj"],

  // loading is initially true
  loading: true,

  loaded: false,

  loadFailed: false,

  relatedObjPage: null,

  relatedObjDataType: function() {
    return this.get('controllers.kbObj.model.next');
  }.property('controllers.kbObj'),

  relatedObjHeading: function() {
    return I18n.t('kb.' + this.get('relatedObjDataType.shortName') + '.related_heading');
  }.property('relatedObjDataType'),

  addRelatedObjLinkText: function() {
    return I18n.t('kb.' + this.get('relatedObjDataType.shortName') + '.add_related_link');
  }.property('relatedObjDataType')
});
