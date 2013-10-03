// a mini filter is a small row of links that can be used to filter one at a time
// as opposed to a full filter set with blocks and checkboxes
// associated with a single filter block model
Discourse.KbMiniFilterController = Discourse.ObjectController.extend({
  needs: 'kbObjShowWithBreadcrumb',

  // handles changes to the filter block
  filterChanged: function(tagId) {
    var block = this.get('model');

    // tell the block to mark the tag with the given ID as selected
    block.setSelectionById(tagId);

    this.get('controllers.kbObjShowWithBreadcrumb').send('relatedMiniFilterChanged', block);
  }
});
