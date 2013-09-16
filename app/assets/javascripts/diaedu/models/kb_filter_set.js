// models a set of filter blocks. 
// knows how to fetch data for a set of filter blocks from the backend, given filter types.
// we do the fetch in one go to save on overhead.
Discourse.KbFilterSet = Discourse.Model.extend({
  // the array of blocks
  blocks: null,

  // the filter params used to construct the set
  filterParams: null,

  // the data type that the set is filtering
  dataType: null,

  // converts the current state of the filter set into a string for the url (e.g. glyprobs-1,2,3-tags-4,5)
  serialize: function() {
    var chunks = [];
    this.get('blocks').forEach(function(block){
      
      // if the noneChecked flag is set, we stop
      if (block.noneChecked)
        return;

      // get the selected ids
      var ids = block.items.filter(function(i){ return i.isChecked; }).map(function(i){ return i.obj.id; });

      // if any are selected, add a chunk
      if (ids.length > 0)
        chunks.push(block.type + '-' + ids.join(','));
    });

    return chunks.length == 0 ? 'all' : chunks.join('-');
  },

  // checks if this filter set matches the given data type and filter params
  matches: function(dataType, filterParams) {
    return this.get('filterParams') == filterParams && this.get('dataType') == dataType;
  }

});

// class methods
Discourse.KbFilterSet.reopenClass({
  
  // generates a FilterSet containing a set of FilterBlock objects based on filterParams
  generate: function(dataType, filterParams) {

    // call the backend asking for filter options matching the given filterParams
    return Discourse.ajax("/kb/filter-options", {
      data: {data_type: dataType.shortName, filter_params: filterParams}

    }).then(function (data) {
      
      // build block objects
      var blocks = data.filter_options.map(function(blockData){ return Discourse.KbFilterBlock.create(blockData); });

      // build and return set object
      return Discourse.KbFilterSet.create({ dataType: dataType, filterParams: filterParams, blocks: blocks });
    });
  }
});

