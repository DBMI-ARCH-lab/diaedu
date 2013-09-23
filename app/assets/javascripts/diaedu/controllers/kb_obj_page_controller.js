Discourse.KbObjPageController = Discourse.ObjectController.extend({
  needs: ["kbObj"],

  dataType: function() {
    return this.get('controllers.kbObj.model');
  }.property('controllers.kbObj')

});
