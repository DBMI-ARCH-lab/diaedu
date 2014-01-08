// models data for one block in the filter pane
Discourse.KbFilterBlock = Discourse.Model.extend({
  // the filter type, e.g. glyprobs, tags
  type: null,

  init: function() { var self = this;
    this._super();

    // create filter block item objects for each entry in itemsData
    this.set('items', this.get('itemsData').map(function(data){
      // add a reference to self
      data.parent = self;

      return Discourse.KbFilterBlockItem.create(data);
    }));
  },

  // returns translated filter block title
  title: function() {
    return I18n.t('diaedu.filter.title.' + this.get('type'));
  }.property('type'),

  // path to the icon for this block
  iconPath: function() {
    return '/assets/diaedu/' + this.get('type') + '-smaller.png';
  }.property('type'),

  // whether all of the items are unchecked or not
  noneChecked: function(key, value) { var self = this;

    // if noneChecked is being set to true, set all the items to unchecked and return true immediately
    if (arguments.length > 1 && !!value) {
      self.get('items').forEach(function(i){ i.set('isChecked', false); });
      return true;

    // otherwise, compute the value
    } else
      return self.get('items').filter(function(i){ return i.get && i.get('isChecked'); }).length == 0;

  }.property('items.@each.isChecked'),

  // converts this block into a filter parameter chunk
  // returns null if nothing selected
  serialized: function() { var self = this;
    // if the noneChecked flag is set, we stop
    if (self.get('noneChecked'))
      return null;

    // get the selected ids
    var ids = self.get('items').filter(function(i){ return i.get('isChecked'); }).map(function(i){ return i.get('obj.id'); });

    // if any are selected, build and return the text
    if (ids.length > 0)
      return self.get('type') + '-' + ids.join(',');
    else
      return null;

  }.property('items.@each.isChecked'),

  // sets the item with the given id to checked, and all others to unchecked
  setSelectionById: function(id) { var self = this;
    Ember.changeProperties(function(){
      self.get('items').forEach(function(item){
        item.set('isChecked', item.get('obj.id') == id);
      });
    });
  }
});