Discourse.KbTrigger = Discourse.KbObj.extend({
  name: '',

  // related glyprobs
  glyprobs: null,

  // builds a data object to submit to server
  serialize: function() {
    var data = this.getProperties('name', 'description');
    this.serializeTags(data);
    return data;
  },

  // gets the choices for related glyprob
  glyprobChoices: function() { var self = this;
    Discourse.ajax("/kb/glycemic-problems", {
      method: 'GET',
      data: {for_select: true},
    
    // on ajax success
    }).then(function(data) {
      self.set('glyprobChoices', data);

    // on ajax error
    }, function(){

    });

    return [];
  }.property()

});