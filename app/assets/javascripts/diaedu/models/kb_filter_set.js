// models a set of filter blocks. 
// knows how to fetch data for a set of filter blocks from the backend, given filter types.
// we do the fetch in one go to save on overhead.
Discourse.KbFilterSet = Discourse.Model.extend({
  blocks: null
});

Discourse.KbFilterSet.reopenClass({
  // generates a FilterSet containing a set of FilterBlock objects based on filterTypes and the current Filter
  generate: function(filterTypes, currentFilter) {
    return Discourse.KbFilterSet.create({blocks: [], count: filterTypes.length});
  }
});

