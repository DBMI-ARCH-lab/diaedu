Discourse.KbObjShowWithBreadcrumbController = Discourse.ObjectController.extend({
  // loading flag, with initial settings
  loading: null,

  // KbObjPage instance that represents the list of related kb objs shown on the page
  relatedObjPage: null,

  // KbFilterBlock object for tags, to be used in the minifilter
  tagFilterBlock: null,

  // checks if the current user is allowed to post comments
  canComment: function() { var self = this;
    return !!self.get('currentUser');
  }.property('currentUser'),

  actions: {
    // likes the current KbObj by either creating a new topic for it or liking the existing one
    likeObj: function() { var self = this;
      self.get('model').like();
    }
  }
});
