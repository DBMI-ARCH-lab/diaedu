Discourse.KbMiniFilterView = Discourse.View.extend({
  templateName: 'diaedu/templates/kb_objs/mini_filter',
  classNames: 'mini-filter',

  // handle clicks on links
  click: function(e) {
    if ($(e.target).is('a'))
      this.get('controller').send('filterChanged', $(e.target).data('id'));
    return false;
  }
});