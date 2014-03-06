// models a link or a file attachment
Discourse.KbEvidenceItem = Discourse.Model.extend({

  id: null,
  type: null, // link or file
  title: null,
  url: null,
  file: null, // data about the file

  isFile: Ember.computed.equal('type', 'file'),

  init: function() { var self = this;
    self._super();

    self.uploaded = false;
  }

});