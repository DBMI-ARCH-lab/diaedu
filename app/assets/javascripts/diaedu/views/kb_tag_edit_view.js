Discourse.KbTagEditView = Discourse.View.extend({
  templateName: 'diaedu/templates/tag_edit',

  didInsertElement: function() {
    $('#obj-tags').tokenInput('/kb/tags/suggest', {
      hintText: I18n.t('kb.tags.type_to_add_new'),
      noResultsText: I18n.t('kb.tags.none_found'),
      searchingText: I18n.t('kb.tags.searching'),
    //   resultsFormatter: this.formatTokenResult,
    //   preventDuplicates: true,
    //   tokenValue: 'name'
      zindex: 9999
//      onResult: function(results){ return self.process_token_results(results); },
//    onAdd: function(item){ return self.token_added(item); },
//    onEnter: function(){ self.add_options(); }
    });
  },

  // returns the html to insert in the token input result list
  formatTokenResult: function(item) {
    console.log('FORMATTING');
    // var details, css = "details";
    // // if this is the new placeholder, add a string about that
    // if (item.id == null) {
    //   details = I18n.t('option_set.create_new');
    //   css = "details create_new"
    // // otherwise if no option sets were returned, use the none string
    // } else if (item.set_names == '')
    //   details = '[' + I18n.t('common.none') + ']'
    // // otherwise just use item.sets verbatim
    // else
    //   details = item.set_names;
    
    //return '<li>' + item.name + '<div class="'+ css + '">' + details + '</div></li>';
    return '<li>foo</li>';
  }
});