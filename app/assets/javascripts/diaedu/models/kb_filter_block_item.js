// models data for one line of one block in the filter pane
Discourse.KbFilterBlockItem = Discourse.Model.extend({
  isChecked: null,
  obj: null,
  parent: null
});

Discourse.KbFilterBlockItem.reopen({
  // observe isChecked and pass to parent
  isCheckedChanged: function() {
    this.get('parent').itemChanged();
  }.observes('isChecked'),
});