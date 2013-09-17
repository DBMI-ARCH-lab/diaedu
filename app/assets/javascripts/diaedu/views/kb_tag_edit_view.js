Discourse.KbTagEditView = Discourse.View.extend({
  templateName: 'diaedu/templates/tag_edit',

  didInsertElement: function() { var self = this;
    $('#obj-tags').tokenInput('/kb/tags/suggest', {
      hintText: I18n.t('kb.tags.type_to_add_new'),
      noResultsText: I18n.t('kb.tags.none_found'),
      searchingText: I18n.t('kb.tags.searching'),
      tokenValue: 'name',
      preventDuplicates: true,
      zindex: 9999,
      onAdd: function(t) {
        self.get('controller.model.tags').push(t);
      }
    });
  }
});