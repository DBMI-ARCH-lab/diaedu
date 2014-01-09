Discourse.KbRelatedGroupController = Discourse.ObjectController.extend({

  addLinkText: function() { var self = this;
    return I18n.t('diaedu.' + self.get('content.dataType.shortName') + '.add_related_link');
  }.property().readOnly(),

  headingText: function() { var self = this;
    return I18n.t('diaedu.' + self.get('content.dataType.shortName') + '.related_heading');
  }.property().readOnly(),

  smallerIconPath: Ember.computed.alias('content.dataType.smallerIconPath')

});