Discourse.KbTrigger = Discourse.KbObj.extend({
  name: '',

  // builds a data object to submit to server
  serialize: function() {
    var data = this.getProperties('name', 'description');
    this.serializeTags(data);
    return data;
  }

});