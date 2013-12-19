Discourse.KbObj = Discourse.Model.extend(Discourse.KbLazyLoadable, {
  // the data type of this object
  dataType: null,

  tagsToShow: 4,

  tags: null,

  // used for showing the new dialog and indicating which (if any) parent object should be preselected
  preselectedParentId: null,

  breadcrumb: null,

  topic: null,

  // whether the this obj was 'just' liked by the current user
  // used to immediately disallow further likes
  justLiked: null,

  init: function() {
    this._super();

    // init tags to empty array if not already set
    if (!this.get('tags'))
      this.set('tags', []);

    // default to breadcrumb with just self
    this.set('breadcrumb', Discourse.KbBreadcrumb.create().addCrumb(this));
  },

  firstNTags: function() {
    return this.get('tags').slice(0, this.get('tagsToShow'));
  }.property('tags'),

  hasMoreTags: function() {
    return this.get('tags').length > this.get('tagsToShow');
  }.property('tags'),

  moreTagCount: function() {
    return this.get('tags').length - this.get('tagsToShow');
  }.property('tags'),

  // gets a string to use as a row ID in an index list
  rowId: function() {
    return 'obj-' + this.get('id');
  }.property('id'),

  // loads details such as description, etc.
  loadFully: function(opts) { var self = this;
    opts = opts || {};

    // make ajax call
    var promise = Discourse.ajax("/kb/" + this.get('dataType.name') + '/' + this.get('id'), {data: opts});

    return promise.then(function(data) {
      // construct user objects in comment preview
      if (data.commentPreview)
        for (var i = 0; i < data.commentPreview.length; i++)
          data.commentPreview[i].user = Discourse.User.create(data.commentPreview[i].user);

      // construct firstPost object
      if (null !== data.firstPost)
        data.firstPost = Discourse.Post.create(data.firstPost);

      // update the attribs
      self.setProperties(data);
    });
  },

  // saves this object to the db
  // returns a promise that resolves to whether the save was successful or not (had errors)
  save: function() { var self = this;
    // do ajax request
    var promise = Discourse.ajax("/kb/" + this.get('dataType.name'), {method: 'POST', data: {obj: this.serialize()}});

    return promise.then(function(response){

      // if error set, save error messages
      if (response.errors) {
        // join error messages into strings, and change any .'s in keys to _'s, for cases like event.name
        var errors = {};
        for (var f in response.errors)
          errors[f.replace(/\./g, '_')] = response.errors[f].join(', ');

        // save on model
        self.set('errors', errors);
      }

      // return whether the save was successful
      return !response.errors;
    });
  },

  // serializes the tags array to a Rails compatible format
  // stores in the passed data object
  serializeTags: function(data) {
    // add tags
    data.taggings_attributes = this.get('tags').map(function(t){
      var tagging = {id: t.id};
      // if the tag has no id (it's new), we need to add the tag attributes
      if (t.id == null)
        return {tag_attributes: {name: t.name}}
      else
        return {tag_id: t.id, _destroy: t._destroy};
    });
  },

  hasRelatedParents: function() {
    return this.get('dataType.rank') > 0;
  }.property('dataType.rank'),

  // gets full list of related parent objs
  // uses lazy loading
  relatedParents: function() { var self = this;
    return self.lazyLoad('_relatedParents', Em.A(), function() {
      return self.get('dataType.prev.modelClass').findAll({
        filterParams: self.get('id') ? self.get('dataType.shortName') + '-' + self.get('id') : 'all',
        breadcrumb: self.get('breadcrumb').removeCrumb(self)
      });
    });
  }.property('dataType.prev', '_relatedParents'),

  // gets the topic associated with this object
  // returns a promise that resolves with the topic
  // if a topic is already defined, simply resolves immediately with the topic
  // else, if topic is currently null, calls server to construct one and returns that
  getTopic: function() { var self = this;
    var promise;

    // if already exists, just resolve immediately
    if (self.topic != null) {

      promise = new Ember.Deferred();
      promise.resolve(Discourse.Topic.create(self.topic));

    // otherwise, hit the server
    } else {

      // do ajax
      promise = Discourse.ajax("/kb/" + self.get('dataType.name') + '/' + self.get('id') + '/ensure-topic', {method: 'POST', data: {'_method' : 'PUT'}});

      // on ajax success, setup the topic
      promise = promise.then(function(topicData) {
        // store the topic in the model
        self.topic = topicData;

        // build topic object and return
        return Discourse.Topic.create(self.topic);
      });
    }

    return promise;
  },

  hasComments: function() { var self = this;
    return self.comments > 0;
  }.property('comments'),

  // checks if the obj can be liked by the current user
  // this information is stored in the firstPost action summary
  // if there is no firstPost, then canLike returns true
  canLike: function() {
    if (this.get('justLiked'))
      return false;
    else if (this.get('firstPost'))
      return this.get('firstPost.actionByName.like.can_act');
    else
      return true;
  }.property('firstPost.actionByName.like.can_act', 'justLiked'),

  // checks if the current user has already liked this obj
  liked: function() {
    return this.get('justLiked') || this.get('firstPost.actionByName.like.acted');
  }.property('firstPost.actionByName.like.acted', 'justLiked'),

  // adds a 'like' for this object for the current user
  // returns a promise that resolves when the like operation is done
  like: function() { var self = this;
    // increment the like count and 'justLiked' immediately for user feedback
    self.set('likes', self.get('likes') + 1);
    self.set('justLiked', true);

    // this function will actually finish the like once the post is loaded, and return a promise
    var finishLike = function(){
      return self.get('firstPost.actionByName.like').act();
    };

    // if there is currently no firstPost, reload, making sure that a topic gets created
    if (null === this.get('firstPost'))
      return this.loadFully({ensure_topic: true, dont_add_view: true}).then(function(){
        // we need to increment the like count here /again/ temporarily b/c we haven't actually liked it yet
        self.set('likes', self.get('likes') + 1);

        return finishLike();
      });
    else
      return finishLike();
  },

  ////////////// i18n properties, should probably be refactored to controllers /////////////////////

  // i18n'd phrase such as '13 comments'
  commentCountWithNoun: function() { var self = this;
    return I18n.t('kb.comments.comment_count', {count: self.comments});
  }.property('comments'),

  // i18n'd name for comments, properly pluralized
  commentsText: function() { var self = this;
    return I18n.t('kb.comments.comments', {count: self.comments});
  }.property('comments'),

  // i18n'd name for likes, properly pluralized
  likesText: function() { var self = this;
    return I18n.t('kb.likes', {count: self.likes});
  }.property('likes'),

  // i18n'd name for views, properly pluralized
  viewsText: function() { var self = this;
    return I18n.t('kb.views', {count: self.views});
  }.property('views')
});

Discourse.KbObj.reopenClass({
  dataTypeName: null,

  dataType: function() {
    return Discourse.KbDataType.get(this.dataTypeName);
  },

  // gets minimally populated versions of all objects
  findAll: function(options) { var self = this;
    var promise = Discourse.ajax(this.dataType().get('backendPath') + '/' + options.filterParams, {method: 'GET', data: {for_select: true}});

    // create objs from the returned array of attribs and return
    return promise.then(function(data) {
      var k = self.dataType().get('modelClass');
      return data.map(function(attribs){
        var obj = k.create(attribs);

        // merge the provided breadcrumb, if it exists, with the object's
        if (options.breadcrumb) obj.get('breadcrumb').merge(options.breadcrumb);

        return obj;
      });
    });
  }
});