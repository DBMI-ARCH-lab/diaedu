// A set of KbObjs that are related to to a given KbObj
Discourse.KbRelatedGroup = Discourse.Model.extend({

  // the KbObj subtype instance to which the group is related
  source: null,

  // a KbObjRelation describing the relation that gave rise to this group
  relation: null,

  // a KbObjPage containing the pages of returned objects
  objPage: null,

  // a KbFilterBlock representing the tag mini filter, if needed
  filterBlock: null,

  // sets up the objPage and filterBlock based on the source and relation that are passed in when this is created
  init: function() { var self = this;

    // source and relation should be provided on create
    if (!self.get('source') || !self.get('relation'))
      throw new Error("source and relation should be provided on KbRelatedGroup creation");

    self.loadObjPage();
    //self.loadFilterBlock();

  },

  // loads and creates a KbObjPage for the appropriate source and relation
  loadObjPage: function() { var self = this;
    // we always want the first page of results
    var page = 1;

    // start ajax request
    return Discourse.KbObjPage.find(self.get('dataType'), page, self.get('filterParams')).then(function(objPage){
      self.set('objPage', objPage);
    });
  },

  // gets the KbDataType obj for the related subtype
  dataType: function() { var self = this;
    return self.get('relation.other').dataType();
  }.property(),

  // gets a filter param string for getting objs related to the source obj
  filterParams: function() { var self = this;
    return self.get('dataType.shortName') + '-' + self.get('source.id');
  }.property()

});