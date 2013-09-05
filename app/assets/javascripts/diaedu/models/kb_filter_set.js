// models a set of filter blocks. 
// knows how to fetch data for a set of filter blocks from the backend, given filter types.
// we do the fetch in one go to save on overhead.
Discourse.KbFilterSet = Discourse.Model.extend({
  // the array of blocks
  blocks: null,

  // converts the current state of the filter set into a string for the url (e.g. glyprobs-1,2,3-tags-4,5)
  serialize: function() {
    var chunks = [];
    this.get('blocks').forEach(function(block){
      var ids = block.items.filter(function(i){ return i.isChecked; }).map(function(i){ return i.obj.id; });
      if (ids.length > 0)
        chunks.push(block.type + '-' + ids.join(','));
    });

    return chunks.join('-');
  }
});

// class methods
Discourse.KbFilterSet.reopenClass({
  
  // generates a FilterSet containing a set of FilterBlock objects based on filterTypes and filterParams
  generate: function(filterTypes, filterParams) {
    
    // call the backend asking for filter options matching the given filterTypes and filterParams
    return Discourse.ajax("/kb/filter-options", {data: {filter_types: filterTypes, filter_params: filterParams}}).then(function (data) {
      
      // build block objects
      var blocks = data.filter_options.map(function(blockData){ return Discourse.KbFilterBlock.create(blockData); });

      // build and return set object
      return Discourse.KbFilterSet.create({ blocks: blocks });
    });
  }
});

