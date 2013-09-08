Discourse.KbObjNewView = Discourse.ModalBodyView.extend({
  templateName: 'diaedu/templates/kb_objs/new',

  title: function() {
    return I18n.t('kb.' + this.get('controller.dataType.shortName') + '.new_title');
  }.property('controller.dataType.shortName')
});