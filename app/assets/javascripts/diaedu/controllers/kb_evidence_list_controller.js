// controller for the list of evidence on an object form
Discourse.KbEvidenceListController = Ember.ArrayController.extend({

  // a hash for storing known file items so that we can look them up when we receive events about them
  file_items: null,

  init: function() { var self = this;
    self._super();
    self.file_items = {};
  },

  actions: {
    // called when a file has been added to the evidence area
    // file - a hash of data about the file
    fileAdded: function(file) { var self = this;
      var item = Discourse.KbEvidenceItem.create({type: 'file', file: file});

      // save for later
      self.file_items[file] = item;

      // add to model, which will add to view
      self.pushObject(item);
    }
  }
});

// this is just here to specify the template
Discourse.KbEvidenceListView = Discourse.View.extend({
  templateName: 'javascripts/diaedu/templates/evidence_list'
});