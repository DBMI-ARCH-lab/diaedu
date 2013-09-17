Discourse.KbObjNewView = Discourse.ModalBodyView.extend({
  templateName: 'diaedu/templates/kb_objs/new',

  formTemplate: function() {
    return 'diaedu/templates/kb_' + this.get('controller.dataType.shortName') + '/form';
  }.property('controller.dataType.shortName'),

  title: function() {
    return I18n.t('kb.' + this.get('controller.dataType.shortName') + '.new_title');
  }.property('controller.dataType.shortName')
});