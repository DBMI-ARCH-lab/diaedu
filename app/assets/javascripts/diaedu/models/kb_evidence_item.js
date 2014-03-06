// models a link or a file attachment
Discourse.KbEvidenceItem = Discourse.Model.extend({

  id: null,
  type: null, // link or file
  title: null,
  url: null, // for link-type items only
  fileName: null, // the original fileName
  status: null, // upload status

  isFile: Ember.computed.equal('type', 'file'),

  init: function() { var self = this;
    self._super();
  }

});