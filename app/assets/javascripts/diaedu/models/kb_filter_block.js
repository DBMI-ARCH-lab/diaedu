// models data for one block in the filter pane
Discourse.KbFilterBlock = Discourse.Model.extend({
  type: null,
  items: null,

  // false iff any of the isChecked fields inside items is true
  noneChecked: true,

  // returns translated filter block title
  title: function(){
    return I18n.t('diaedu.filter.title.' + this.get('type'));
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
  },

  // path to the icon for this block
  iconPath: function() {
    return '/assets/diaedu/' + this.get('type') + '-smaller.png';
  }.property('type'),

  // sets the item with the given id to checked, and all others to unchecked
  setSelectionById: function(id) {
    this.get('items').forEach(function(item){
      item.set('isChecked', item.get('obj.id') == id);
    });

    // fire the item changed event so that noneChecked stays accurate
    this.itemChanged();
  },

  // converts this block into a filter parameter chunk
  // returns null if nothing selected
  serialize: function() {
    // if the noneChecked flag is set, we stop
    if (this.get('noneChecked'))
      return null;

    // get the selected ids
    var ids = this.get('items').filter(function(i){ return i.get('isChecked'); }).map(function(i){ return i.get('obj.id'); });

    // if any are selected, build and return the text
    if (ids.length > 0)
      return this.get('type') + '-' + ids.join(',');
    else
      return null;
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