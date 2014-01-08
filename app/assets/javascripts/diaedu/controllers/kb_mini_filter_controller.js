// a mini filter is a small row of links that can be used to filter one at a time
// as opposed to a full filter set with blocks and checkboxes
// associated with a single filter block model
Discourse.KbMiniFilterController = Discourse.ObjectController.extend({
  needs: 'kbRelatedGroup',

  actions: {
    // handles changes to the filter block
    filterChanged: function(tagId) { var self = this;

      // tell the block to mark the tag with the given ID as selected
      self.get('content').setSelectionById(tagId);
    }
  }
});
