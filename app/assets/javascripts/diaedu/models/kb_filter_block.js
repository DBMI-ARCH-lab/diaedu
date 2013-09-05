// models data for one block in the filter pane
Discourse.KbFilterBlock = Discourse.Model.extend({
  type: null,
  items: null,

  // false iff any of the isChecked fields inside items is true
  noneChecked: true
});