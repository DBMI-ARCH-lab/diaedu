Discourse.KbObjShowWithBreadcrumbController = Discourse.ObjectController.extend({
  needs: ['kbObj', 'kbObjPage'],

  // loading flag, with initial settings
  loading: null,

  // KbObjPage instance that represents the list of related kb objs shown on the page
  relatedObjPage: null,

  // KbFilterBlock object for tags, to be used in the minifilter
  tagFilterBlock: null,

  actions: {
    // handles a change in the related obj minifilter
    // accepts the filter block object and gets the new filter params from it
    relatedMiniFilterChanged: function(block) { var self = this;
      // build the new filter param string
      var newFilterParams = this.get('model.dataType.shortName') + '-' + this.get('model.id') + '-' + block.serialize();
      var dataType = this.get('relatedObjPage.data_type');

      self.set('relatedObjPage', null);

      // load the new kbobjpage
      Discourse.KbObjPage.find(dataType, 1, newFilterParams).then(function(objPage){
        // add current breadcrumb to all related obj breadcrumbs
        objPage.get('objs').forEach(function(obj){ obj.get('breadcrumb').merge(self.get('model.breadcrumb')); })
        self.set('relatedObjPage', objPage);
      });
    },

    // likes the current KbObj by either creating a new topic for it or liking the existing one
    likeObj: function() { var self = this;
      self.get('model').like();
    }
  },

  // checks if the current user is allowed to post comments
  canComment: function() {
    return !!this.get('currentUser');
  }.property('currentUser'),

  relatedChildrenHeading: function() {
    return I18n.t('kb.' + this.get('model.dataType.next.shortName') + '.related_heading');
  }.property('model.dataType.next'),

  relatedParentsHeading: function() {
    return I18n.t('kb.' + this.get('model.dataType.prev.shortName') + '.related_heading');
  }.property('model.dataType.prev'),

  relatedParentsIconPath: Ember.computed.alias('model.dataType.prev.smallerIconPath'),

  addRelatedObjLinkText: function() {
    return I18n.t('kb.' + this.get('model.dataType.next.shortName') + '.add_related_link');
  }.property('model.dataType.next')

});
