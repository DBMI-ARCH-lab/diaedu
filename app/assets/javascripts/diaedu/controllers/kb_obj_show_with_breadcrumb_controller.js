Discourse.KbObjShowWithBreadcrumbController = Discourse.ObjectController.extend({
  needs: ['kbObj', 'kbObjPage'],

  // loading flags, with initial settings
  loading: true,
  loaded: false,
  loadFailed: false,

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
      Discourse.KbObjPage.find(dataType, 1, newFilterParams)
      .done(function(objPage){
        // add current breadcrumb to all related obj breadcrumbs
        objPage.get('objs').forEach(function(obj){ obj.get('breadcrumb').merge(self.get('model.breadcrumb')); })

        self.set('relatedObjPage', objPage);
      });
    },

    // likes the curren KbObj by either creating a new topic for it or liking the existing one
    likeObj: function() { var self = this;
      this.set('loading', true);
      this.set('loaded', false);

      // if there is currently no firstPost, reload the model, making sure that a topic gets created
      if (null === this.get('firstPost'))
        var topic_load = this.get('model').loadFully({ensure_topic: true});
      else
        var topic_load = $.Deferred().resolve();

      topic_load
      .done(function(){
        self.set('loaded', true);
        self.get('firstPost.actionByName.like').act();
      })
      .fail(function() {
        self.set('loadFailed', true);
      })
      .always(function() {
        self.set('loading', false);
      })
    }
  },

  // checks if the current user is allowed to post comments
  canComment: function() {
    return !!this.get('currentUser');
  }.property('currentUser'),

  // checks if the current KbObj can be liked by the current user
  // this information is stored in the KbObj's firstPost action summary
  // if there is no firstPost, then canLike returns true
  canLike: function() {
    if (this.get('model.firstPost'))
      return this.get('model.firstPost.actionByName.like.can_act');
    else
      return true;
  }.property('model.firstPost.actionByName.like.can_act'),

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
