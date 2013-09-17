Discourse.KbGlyprob = Discourse.KbObj.extend({
  event: '',

  eval: null,

  // builds a data object to submit to server
  serialize: function() {
    var data = this.getProperties('eval', 'event', 'description');
    this.serializeTags(data);
    return data;
  }

});