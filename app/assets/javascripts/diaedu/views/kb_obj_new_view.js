Discourse.KbObjNewView = Discourse.ModalBodyView.extend({
  templateName: 'diaedu/templates/kb_objs/new',

  formTemplate: function() {
    return 'diaedu/templates/kb_' + this.get('controller.model.dataType.shortName') + '/form';
  }.property('controller.model.dataType.shortName'),

  title: function() {
    return I18n.t('kb.' + this.get('controller.model.dataType.shortName') + '.new_title');
  }.property('controller.model.dataType.shortName')
});