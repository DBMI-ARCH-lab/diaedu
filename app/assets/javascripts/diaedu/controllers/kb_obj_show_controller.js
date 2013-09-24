Discourse.KbObjShowController = Discourse.ObjectController.extend({
  needs: ["kbObj"],

  // loading is initially true
  loading: true,

  loaded: false,

  loadFailed: false,

  relatedObjPage: null,

  // stores the KbFilterBlock object for tags, to be used in the minifilter
  tagFilterBlock: null,

  relatedObjDataType: function() {
    return this.get('controllers.kbObj.model.next');
  }.property('controllers.kbObj'),

  relatedObjHeading: function() {
    return I18n.t('kb.' + this.get('relatedObjDataType.shortName') + '.related_heading');
  }.property('relatedObjDataType'),

  addRelatedObjLinkText: function() {
    return I18n.t('kb.' + this.get('relatedObjDataType.shortName') + '.add_related_link');
  }.property('relatedObjDataType'),

  // handles a change in the related obj minifilter
  // accepts the filter block object and gets the new filter params from it
  relatedMiniFilterChanged: function(block) {
    console.log(block);
  }
});
