Discourse.KbTagEditView = Discourse.View.extend({
  templateName: 'javascripts/diaedu/templates/tag_edit',

  didInsertElement: function() { var self = this;
    $('#obj-tags').tokenInput('/kb/tags/suggest', {
      hintText: I18n.t('diaedu.tags.type_to_add_new'),
      noResultsText: I18n.t('diaedu.tags.none_found'),
      searchingText: I18n.t('diaedu.tags.searching'),
      tokenValue: 'name',
      preventDuplicates: true,
      zindex: 9999,
      onAdd: function(t) {
        self.get('controller.model.tags').push(t);
      },
      onDelete: function(t) {
        var tags = self.get('controller.model.tags');
        for (var i = 0; i < tags.length; i++)
          if (tags[i].name == t.name) {
            tags.splice(i,1);
            return;
          }
      }
    });
  }
});