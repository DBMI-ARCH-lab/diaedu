// controller for button linking community topic to kb
Discourse.KbLinkToKbButtonController = Discourse.ObjectController.extend({
  needs: 'topic',

  init: function() { var self = this;
    self._super();

    // get current topic's kb object (if any)
    Discourse.KbObj.findByTopicId(self.get('controllers.topic.content.id')).then(function(obj){
      console.log("GOT THE KB OBJ!", obj);
    });
  }

});