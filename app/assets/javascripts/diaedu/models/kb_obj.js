Discourse.KbObj = Discourse.Model.extend(Discourse.KbLazyLoadable, {
  // the data type of this object
  dataType: null,

  tagsToShow: 4,

  tags: null,

  // used for showing the new dialog and indicating which (if any) parent object should be preselected
  preselectedParentId: null,

  breadcrumb: null,

  topic: null,

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
  loadFully: function() { var self = this;
    
    // make ajax call
    var promise = Discourse.ajax("/kb/" + this.get('dataType.name') + '/' + this.get('id'));

    return promise.then(function(data) {
      // construct user objects in comment preview
      if (data.commentPreview)
        for (var i = 0; i < data.commentPreview.length; i++)
          data.commentPreview[i].user = Discourse.User.create(data.commentPreview[i].user);

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
    return this.get('dataType.rank') > 1;
  }.property('dataType.rank'),

  // gets full list of related parent objs
  relatedParents: function() { var self = this;
    return this.lazyLoad('_relatedParents', Em.A(), function() {
      var k = self.get('dataType.prev.modelClass');
      if (k) {
        // if this object has an id, then we should filter on it
        var filter = self.get('id') ? self.get('dataType.shortName') + '-' + self.get('id') : 'all';
        return k.findAll({filter: filter, breadcrumb: self.get('breadcrumb').removeCrumb(self)});
      } else
        return null;
    });
  }.property('dataType.prev', '_relatedParents'),

  // gets the topic associated with this object
  // returns a Deferred that resolves with the topic
  // if a topic is already defined, simply resolves immediately with the topic
  // else, if topic is currently null, calls server to construct one and returns that
  getTopic: function() { var self = this;
    var def = $.Deferred();
    
    // if already exists, just resolve immediately
    if (self.topic != null)
      def.resolve(Discourse.Topic.create(self.topic));
    
    // otherwise, hit the server
    else
      Discourse.ajax("/kb/" + self.get('dataType.name') + '/' + self.get('id') + '/ensure-topic', {
        method: 'POST',
        data: {'_method' : 'PUT'},
      
      // on ajax success
      }).then(function(topic_data) {
        console.log(topic_data);
        // store the topic in the model
        self.topic = topic_data;
        def.resolve(Discourse.Topic.create(self.topic));
        
      // on ajax error
      }, function(){
        def.reject();
      });

    return def;
  },

  hasComments: function() { var self = this;
    return self.comments > 0;
  }.property('comments'),

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
  }.property('views'),
});

Discourse.KbObj.reopenClass({
  dataTypeName: null,

  dataType: function() {
    return Discourse.KbDataType.get(this.dataTypeName);
  },

  // REFACTOR this method needs to be removed
  find: function(options) {
    // setup a jquery deferred b/c it's better than Ember.Deferred
    var def = $.Deferred();

    Discourse.ajax("/kb/" + options.dataType.get('name') + '/' + options.id, {
      method: 'GET'
    
    // on ajax success
    }).then(function(data) {
      // store the dataType in the object also
      data.dataType = options.dataType;

      // create the object and send it to deferred resolve
      def.resolve(options.dataType.get('modelClass').create(data));
      
    // on ajax error
    }, function(resp){

      // reject the deferred and pass a dummy object
      def.reject(resp, Discourse.KbObj.create(options));
    });

    return def;  
  },

  // gets minimally populated versions of all objects
  findAll: function(options) { var self = this;
    var def = $.Deferred();

    Discourse.ajax(this.dataType().get('backendPath') + '/' + options.filter, {
      method: 'GET',
      data: {for_select: true}

    // on ajax success
    }).then(function(data) {
      // create objs from the returned array of attribs and resolve
      var k = self.dataType().get('modelClass');
      def.resolve(data.map(function(attribs){
        var obj = k.create(attribs);

        // merge the provided breadcrumb, if it exists, with the object's
        if (options.breadcrumb) obj.get('breadcrumb').merge(options.breadcrumb);

        return obj;
      }));
      
    // on ajax error
    }, function(resp){

      def.reject(resp);
    });

    return def;
  }
});