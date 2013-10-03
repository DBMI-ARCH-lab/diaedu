Discourse.KbObjShowWithBreadcrumbController = Discourse.ObjectController.extend({
  needs: ['kbObj', 'kbObjPage'],

  // loading is initially true
  loading: true,

  loaded: false,

  loadFailed: false,

  relatedObjPage: null,

  // stores the KbFilterBlock object for tags, to be used in the minifilter
  tagFilterBlock: null,

  relatedChildrenHeading: function() {
    return I18n.t('kb.' + this.get('model.dataType.next.shortName') + '.related_heading');
  }.property('model.dataType.next'),

  relatedParentsHeading: function() {
    return I18n.t('kb.' + this.get('model.dataType.prev.shortName') + '.related_heading');
  }.property('model.dataType.prev'),

  relatedParentsIconPath: Ember.computed.alias('model.dataType.prev.smallerIconPath'),

  addRelatedObjLinkText: function() {
    return I18n.t('kb.' + this.get('model.dataType.next.shortName') + '.add_related_link');
  }.property('model.dataType.next'),

  // handles a change in the related obj minifilter
  // accepts the filter block object and gets the new filter params from it
  relatedMiniFilterChanged: function(block) { var self = this;
    // build the new filter param string
    var newFilterParams = this.get('model.dataType.shortName') + '-' + this.get('model.id') + '-' + block.serialize();
    var dataType = this.get('relatedObjPage.data_type');

    self.set('relatedObjPage', null);

    // load the new kbobjpage
    Discourse.KbObjPage.find(dataType, 1, newFilterParams)
    .done(function(objPage){
      // add current breadcrumb to all related obj breadcrumbs
      objPage.get('objs').forEach(function(obj){ obj.get('breadcrumb').merge(self.get('model.breadcrumb')); })

      self.set('relatedObjPage', objPage);
    });
  }
});
