Discourse.KbObj = Discourse.Model.extend({
  tagsToShow: 4,

  firstNTags: function() {
    return this.get('tags').slice(0, this.get('tagsToShow'));
  }.property('tags'),

  hasMoreTags: function() {
    return this.get('tags').length > this.get('tagsToShow');
  }.property('tags'),

  moreTagCount: function() {
    return this.get('tags').length - this.get('tagsToShow');
  }.property('tags')
});