Discourse.KbPaginationLink = Discourse.View.extend({
  tagName: 'a',

  click: function() {
    this.get('controller').send('changePage', this.get('pageId'));
  }
});