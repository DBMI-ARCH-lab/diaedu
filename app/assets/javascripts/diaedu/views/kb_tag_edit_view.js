Discourse.KbTagEditView = Discourse.View.extend({
  templateName: 'diaedu/templates/tag_edit',

  didInsertElement: function() {
    this.$('input').tokenInput('/kb/', {
      hintText: I18n.t('kb.tags.type_to_add_new'),
      noResultsText: I18n.t('kb.tags.none_found'),
      searchingText: I18n.t('kb.tags.searching'),
//      resultsFormatter: self.format_token_result,
      preventDuplicates: true,
      tokenValue: 'name'
//      onResult: function(results){ return self.process_token_results(results); },
//      onAdd: function(item){ return self.token_added(item); },
//      onEnter: function(){ self.add_options(); }
    });
  }
});