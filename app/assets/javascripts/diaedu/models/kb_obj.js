Discourse.KbObj = Discourse.Model.extend({
  dataType: null,

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

  save: function() { var self = this;
    return Discourse.ajax("/kb/" + this.get('dataType.name'), {
      method: 'POST',
      data: {obj: this.getProperties('name', 'description')}
    
    // do nothing on success for now
    }).then(function() {

    // save errors to model on fail
    }, function(resp){
      if (resp.status == 422) {
        self.set('errors', resp.responseJSON.errors);
      }
    });
  }
});