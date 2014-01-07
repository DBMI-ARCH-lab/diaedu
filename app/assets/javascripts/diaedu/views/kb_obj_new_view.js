Discourse.KbObjNewView = Discourse.ModalBodyView.extend({
  templateName: 'javascripts/diaedu/templates/kb_objs/new',

  formTemplate: function() {
    return 'javascripts/diaedu/templates/kb_' + this.get('controller.model.dataType.shortName') + '/form';
  }.property('controller.model.dataType.shortName'),

  title: function() {
    return I18n.t('diaedu.' + this.get('controller.model.dataType.shortName') + '.new_title');
  }.property('controller.model.dataType.shortName')
});