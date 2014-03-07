// controller for the list of evidence on an object form
Discourse.KbEvidenceListController = Ember.ArrayController.extend({

  itemController: 'KbEvidenceItem',

  // a hash for storing known file items so that we can look them up when we receive events about them
  fileItems: null,

  init: function() { var self = this;
    self._super();
    self.fileItems = {};
    self.fileCounter = 0;
  },

  uploadInProgress: function() { var self = this;
    return self.filterBy('uploading').length > 0;
  }.property('@each.uploading'),

  actions: {
    // adds a new link evidence item
    addLink: function() { var self = this;
      var item = Discourse.KbEvidenceItem.create({kind: 'link', url: 'http://', status: 'complete'});
      self.pushObject(item);
    },

    // removes an evidence item
    remove: function(item) { var self = this;
      self.removeObject(self.findBy('content', item));
    },

    // called when a file has been added to the evidence area
    // file - a hash of data about the file
    fileAdded: function(file, uploader) { var self = this;
      var item = Discourse.KbEvidenceItem.create({kind: 'file', filename: file.name, status: 'uploading'});

      // add a unique (to this controller) counter value
      file.index = self.fileCounter++;

      // save for later
      self.fileItems[file.index] = item;

      // add to model, which will add to view
      self.pushObject(item);

      // if file is too big, error
      if (file.size > 10000000) {
        item.set('status', 'toobig');
        setTimeout(function(){ self.send('remove', item); }, 3000);
      } else {
        // start the upload
        uploader.submit();
      }
    },

    // called when a file upload fails
    fileFailed: function(file) { var self = this;
      var item = self.fileItems[file.index];
      item.set('status', 'failed');
      setTimeout(function(){ self.send('remove', item); }, 3000);
    },

    // called when a file finishes uploading
    fileCompleted: function(file, result) { var self = this;
      var item = self.fileItems[file.index];
      item.set('id', result.id);
      item.set('status', 'complete');
    }
  }
});

// item controller
Discourse.KbEvidenceItemController = Discourse.ObjectController.extend({
  linkPlaceholder: I18n.t('diaedu.evidence.link'),

  titlePlaceholder: function() { var self = this;
    return I18n.t('diaedu.evidence.title_for_' + self.get('kind'));
  }.property('kind'),

  statusMessage: function() { var self = this;
    return I18n.t('diaedu.evidence.' + self.get('status'));
  }.property('status')

});

// this is just here to specify the template
Discourse.KbEvidenceListView = Discourse.View.extend({
  templateName: 'javascripts/diaedu/templates/evidence_list'
});
