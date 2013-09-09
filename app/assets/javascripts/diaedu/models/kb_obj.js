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

  save: function() {
    return Discourse.ajax("/kb/" + this.get('dataType.name'), {
      method: 'POST',
      data: this.getProperties('name', 'description')
    });
  }
});