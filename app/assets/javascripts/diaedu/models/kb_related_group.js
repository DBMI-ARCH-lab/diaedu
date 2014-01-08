// A set of KbObjs that are related to to a given KbObj
Discourse.KbRelatedGroup = Discourse.Model.extend({

  // the KbObj subtype instance to which the group is related
  source: null,

  // a KbObjRelation describing the relation that gave rise to this group
  relation: null,

  // a KbObjPage containing the pages of returned objects
  objPage: null,

  // a KbFilterBlock representing the tag mini filter, if needed
  tagFilter: null,

  // the latest value of tagFilter.serialized. we cached it here to avoid duplicate calls
  tagFilterSerialized: null,

  // gets the KbDataType obj for the related subtype
  dataType: function() { var self = this;
    return self.get('relation.other').dataType();
  }.property(),

  // gets a filter param string for getting objs related to the source obj
  filterParams: function() { var self = this;
    return self.get('dataType.shortName') + '-' + self.get('source.id');
  }.property(),

  // sets up the objPage and filterBlock based on the source and relation that are passed in when this is created
  init: function() { var self = this;

    // source and relation should be provided on create
    if (!self.get('source') || !self.get('relation'))
      throw new Error("source and relation should be provided on KbRelatedGroup creation");

    self.loadObjPage();

    // only need to load the filter block if this is a forward relation
    if (self.get('relation.direction') == 'forward')
      self.loadTagFilter();
  },

  // loads and creates a KbObjPage for the appropriate source and relation
  // returns a promise which resolves to null when the loading is done
  loadObjPage: function() { var self = this;
    // we always want the first page of results
    var page = 1;

    // start ajax request
    return Discourse.KbObjPage.find(self.get('dataType'), page, self.get('filterParams')).then(function(objPage){
      self.set('objPage', objPage);
      return null;
    });
  },

  // loads and creates a KbFilterBlock for the tag mini filter
  // returns a promise which resolves to null when the loading is done
  loadTagFilter: function() { var self = this;

    // start ajax request
    return Discourse.KbFilterSet.generate(self.get('dataType'), self.get('filterParams')).then(function(filterSet){
      // pick out the tag filter block from the set
      // we use the 'filter' method which is a built in JS array method, not related to our filter infrastructure
      self.set('tagFilter', filterSet.get('blocks').filter(function(b){ return b.get('type') == 'tags'; })[0]);
      return null;
    });
  },

  // gets called to notify that tagFilter has changed
  tagFilterChanged: function() { var self = this;

    // if the serialized filter value has actually changed, proceed
    if (self.get('tagFilterSerialized') != self.get('tagFilter.serialized')) {
      self.set('tagFilterSerialized', self.get('tagFilter.serialized'));
      console.log('FILTER CHANGED TO', self.get('tagFilter.serialized'));
    }
  }.observes('tagFilter.serialized')
});