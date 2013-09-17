Discourse.KbObj = Discourse.Model.extend({
  dataType: null,

  tags: [],

  tagsToShow: 4,

  firstNTags: function() {
    return this.get('tags').slice(0, this.get('tagsToShow'));
  }.property('tags'),

  hasMoreTags: function() {
    return this.get('tags').length > this.get('tagsToShow');
  }.property('tags'),

  moreTagCount: function() {
    return this.get('tags').length - this.get('tagsToShow');
  }.property('tags'),

  rowId: function() {
    return 'obj-' + this.get('id');
  }.property('id'),

  save: function() { var self = this;
    // setup a jquery deferred b/c it's better than Ember.Deferred
    var def = $.Deferred();

    // build data obj to submit
    var data = this.getProperties('name', 'description');

    // add tags
    data.taggings_attributes = this.get('tags').map(function(t){
      var tagging = {id: t.id};
      // if the tag has no id (it's new), we need to add the tag attributes
      if (t.id == null)
        return {tag_attributes: {name: t.name}}
      else
        return {tag_id: t.id, _destroy: t._destroy};
    });

    // do ajax request
    Discourse.ajax("/kb/" + this.get('dataType.name'), {
      method: 'POST',
      data: {obj: data},
    
    // on ajax success
    }).then(function(data) {
      def.resolve(data);

    // on ajax error
    }, function(resp){
      if (resp.status == 422) {
        
        // join error messages into strings
        var errors = resp.responseJSON.errors;
        for (var f in errors) errors[f] = errors[f].join(', ');

        // save on model
        self.set('errors', errors);
      }

      def.reject();
    });

    return def;
  }
});