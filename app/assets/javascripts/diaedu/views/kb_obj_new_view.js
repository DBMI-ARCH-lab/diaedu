Discourse.KbObjNewView = Discourse.ModalBodyView.extend({
  templateName: 'javascripts/diaedu/templates/new',

  formTemplate: function() {
    return 'javascripts/diaedu/templates/' + this.get('controller.model.dataType.shortName') + '_form';
  }.property('controller.model.dataType.shortName'),

  title: function() {
    return I18n.t('diaedu.' + this.get('controller.model.dataType.shortName') + '.new_title');
  }.property('controller.model.dataType.shortName')
});