// models data for one block in the filter pane
Discourse.KbFilterBlock = Discourse.Model.extend({
  type: null,
  items: null,

  // false iff any of the isChecked fields inside items is true
  noneChecked: true,

  // returns translated filter block title
  title: function(){
    return I18n.t('kb.filter.title.' + this.get('type'));
  }.property('type'),

  init: function() {
    this._super();

    var self = this;

    // create filter block item objects for items
    this.set('items', this.get('items').map(function(data){ 
      // add a reference to self
      data.parent = self;

      return Discourse.KbFilterBlockItem.create(data);
    }));
  },

  // handle changes to child items. not an observer -- method called directly by items.
  itemChanged: function() {
    // set noneChecked appropriately
    this.set('noneChecked', this.get('items').filter(function(i){ return i.isChecked; }).length == 0);
  }
});

// class methods
Discourse.KbFilterBlock.reopen({
  
  // observe noneChecked to make sure items.isChecked is kept accurate
  noneCheckedChanged: function() {
    // if noneChecked just became checked, set all isChecked for items to false
    if (this.get('noneChecked'))
      this.get('items').forEach(function(i){ i.set('isChecked', false); });
  }.observes('noneChecked')
});