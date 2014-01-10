// controller for button linking community topic to kb
Discourse.KbLinkToKbButtonController = Discourse.ObjectController.extend({
  needs: 'topic',
  kbObj: null,

  topic: Ember.computed.alias('controllers.topic.content')
});