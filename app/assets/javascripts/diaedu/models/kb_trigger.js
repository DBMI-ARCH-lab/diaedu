Discourse.KbTrigger = Discourse.KbObj.extend({
  name: '',

  // IDs of related glyprobs
  glyprob_ids: null,

  // builds a data object to submit to server
  serialize: function() {
    var data = this.getProperties('name', 'description', 'glyprob_ids');
    this.serializeTags(data);
    return data;
  },

  // gets the choices for related glyprob
  glyprobChoices: function() { var self = this;
    return Discourse.ajax("/kb/glycemic-problems", {
      method: 'GET',
      data: {for_select: true},
    
    // on ajax success
    }).then(function(data) {
      return data;

    // on ajax error
    }, function(){

    });
  }

});