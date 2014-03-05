Discourse.KbObj = Discourse.Model.extend({
  // the data type of this object
  dataType: null,

  tagsToShow: 4,

  tags: null,

  // used for showing the new dialog and indicating which (if any) parent object should be preselected
  preselectedParentId: null,

  breadcrumb: null,

  topic: null,

  evidenceList: null,

  // whether the this obj was 'just' liked by the current user
  // used to immediately disallow further likes
  justLiked: null,

  init: function() {
    this._super();

    // init tags to empty array if not already set
    if (!this.get('tags'))
      this.set('tags', Em.A());

    // default to breadcrumb with just self
    this.set('breadcrumb', Discourse.KbBreadcrumb.create().add(this));

    this.set('evidenceList', Em.A());
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

  // checks if this obj has any comments
  hasComments: Ember.computed.gt('comments', 0),

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

  // returns an array of KbRelatedGroups related to this object in the forward direction only
  forwardRelatedGroups: function() { var self = this;
    return self.relatedGroups('forward');
  }.property(),

  // returns an array of KbRelatedGroups related to this object in the backward direction only
  backwardRelatedGroups: function() { var self = this;
    return self.relatedGroups('backward');
  }.property(),

  // gets the preferred parent dataType, which is the data type of the preselectedParent, if set
  // otherwise it's the datatype of the first backward relation, or null if there are no backward relations
  preferredParentDataType: function() { var self = this;
    if (self.get('preselectedParent'))
      return self.get('preselectedParent.dataType')
    else {
      var backward = self.relations('backward')[0];
      return backward ? backward.other.dataType() : null;
    }
  }.property('preselectedParent'),

  // loads details such as description, etc.
  loadFully: function(opts) { var self = this;
    opts = opts || {};

    // make ajax call
    var promise = Discourse.cleanAjax("/kb/" + this.get('dataType.name') + '/' + this.get('id'), {data: opts});

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
    return Discourse.cleanAjax("/kb/" + self.get('dataType.name'), {method: 'POST', data: {obj: self.serialize()}}).then(function(response){

      // if error set, save error messages
      if (response.errors) {
        // join error messages into strings, and change any .'s in keys to camel case, for cases like event.name
        var errors = {};
        for (var f in response.errors)
          errors[f.replace(/\.([a-z])/gi, function(m, $1){ return $1.toUpperCase(); })] = response.errors[f].join(', ');

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
    data.taggingsAttributes = this.get('tags').map(function(t){
      var tagging = {id: t.id};
      // if the tag has no id (it's new), we need to add the tag attributes
      if (t.id == null)
        return {tag_attributes: {name: t.name}}
      else
        return {tag_id: t.id, _destroy: t._destroy};
    });
  },

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
      promise = Discourse.cleanAjax("/kb/" + self.get('dataType.name') + '/' + self.get('id') + '/ensure-topic', {method: 'POST', data: {'_method' : 'PUT'}});

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
      return this.loadFully({ensureTopic: true, dontAddView: true}).then(function(){
        // we need to increment the like count here /again/ temporarily b/c we haven't actually liked it yet
        self.set('likes', self.get('likes') + 1);

        return finishLike();
      });
    else
      return finishLike();
  },

  // returns relations of the given direction
  relations: function(direction) { var self = this;
    return self.constructor.relations().filter(function(r){ return r.get('direction') == direction; });
  },

  // returns an array of KbRelatedGroups related to this object
  // direction - the direction of relation that should be returned (backward or forward)
  relatedGroups: function(direction) { var self = this;
    // build a KbRelatedGroup for each relation
    return self.relations(direction).map(function(relation) {
      return Discourse.KbRelatedGroup.create({source: self, relation: relation});
    });
  },

  // builds a data object to submit to server
  // should be overridden for subclasses with special serialization needs
  serialize: function() {
    var data = this.getProperties('name', 'description', 'inlinkIds');
    this.serializeTags(data);
    return data;
  },

  ////////////// i18n properties, should probably be refactored to controllers /////////////////////

  // i18n'd name for comments, properly pluralized
  commentsText: function() { var self = this;
    return I18n.t('diaedu.comments.comments', {count: self.comments});
  }.property('comments'),

  // i18n'd name for likes, properly pluralized
  likesText: function() { var self = this;
    return I18n.t('diaedu.likes', {count: self.likes});
  }.property('likes'),

  // i18n'd name for views, properly pluralized
  viewsText: function() { var self = this;
    return I18n.t('diaedu.views', {count: self.views});
  }.property('views')
});

Discourse.KbObj.reopenClass({
  dataTypeName: null,

  // constructs a skeleton KbObj subclass instance (e.g. KbTrigger) based on the given params hash
  // the hash should contain id and dataType fields
  // type should look like e.g. Glyprob
  buildFromIdAndType: function(id, dataType) {
    return Discourse['Kb' + dataType].create({id: id});
  },

  dataType: function() {
    return Discourse.KbDataType.get(this.dataTypeName);
  },

  // gets a kb obj subtype instance (e.g. KbTrigger) based on the ID of its related topic
  // returns a promise that resolves to the KbObj if found, or to null if not
  findByTopicId: function(topicId) { var self = this;
    return Discourse.cleanAjax('/kb/obj/by-topic-id', {method: 'GET', data: {topicId: topicId}}).then(function(data){
      return data ? Discourse.KbObj.buildFromIdAndType(data.id, data.unqualifiedType) : null;
    });
  },

  // implemented by subclasses
  relations: function() {
    throw new Error('relations method is implemented in subclasses');
  }
});