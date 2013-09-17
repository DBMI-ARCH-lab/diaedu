Discourse.KbGlyprob = Discourse.KbObj.extend({
  event: '',

  evaluation: null,

  // builds a data object to submit to server
  serialize: function() {
    var data = this.getProperties('evaluation', 'event', 'description');
    this.serializeTags(data);
    return data;
  }

});