Discourse.KbFilter = Discourse.Model.extend({
  items: null,
  param_str: null,

  init: function() {
    this._super();

    // parse the param_str into a hash of arrays

    // if param_str is just 'all', that's the same as no params
    if (this.get('param_str') == 'all')
      this.set('param_str', '');

    // split params into a hash of arrays (a-1,2,3-b-1,2 => {:a => [1,2,3], :b => [1,2]})
    var items = {}
    var cur_key = null;
    this.get('param_str').split('-').forEach(function(chunk, i){
      // for even chunks, create hash key
      if (i % 2 == 0) {
        cur_key = chunk;
        items[chunk] = [];

      // for odd chunks, split again to create value array, and store in hash
      } else
        items[cur_key] = chunk.split(',');
    });

    this.set('items', items);
    console.log(items);
  },

  getItem: function(key) {
    return this.get('items')[key];
  }
});