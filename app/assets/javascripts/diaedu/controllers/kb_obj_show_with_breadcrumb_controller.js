Discourse.KbObjShowWithBreadcrumbController = Discourse.ObjectController.extend({
  needs: ['kbObj', 'kbObjPage'],

  // loading flag, with initial settings
  loading: null,

  // KbObjPage instance that represents the list of related kb objs shown on the page
  relatedObjPage: null,

  // KbFilterBlock object for tags, to be used in the minifilter
  tagFilterBlock: null,

  actions: {
    // likes the current KbObj by either creating a new topic for it or liking the existing one
    likeObj: function() { var self = this;
      self.get('model').like();
    }
  },

  // checks if the current user is allowed to post comments
  canComment: function() {
    return !!this.get('currentUser');
  }.property('currentUser')

});
