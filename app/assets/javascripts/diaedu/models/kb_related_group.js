// A set of KbObjs that are related to to a given KbObj
Discourse.KbRelatedGroup = Discourse.Model.extend({

  // a KbObjRelation describing the relation that gave rise to this group
  relation: null,

  // a KbObjPage containing the pages of returned objects
  objPage: null,

  // a KbFilterBlock representing the tag mini filter, if needed
  filterBlock: null

});