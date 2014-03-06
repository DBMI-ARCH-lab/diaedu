// models a link or a file attachment
Discourse.KbEvidenceItem = Discourse.Model.extend({

  id: null,
  type: null, // link or file
  title: null,
  url: null, // for link-type items only
  fileName: null, // the original file name
  status: null, // upload status

  isFile: Ember.computed.equal('type', 'file'),

  uploading: Ember.computed.equal('status', 'uploading'),
  failed: Ember.computed.equal('status', 'failed'),
  completed: Ember.computed.equal('status', 'completed'),

  init: function() { var self = this;
    self._super();
  },

  // returns Rails compatible object
  serialize: function() { var self = this;
    return self.getProperties('id', 'type', 'title', 'url', 'fileName');
  }

});