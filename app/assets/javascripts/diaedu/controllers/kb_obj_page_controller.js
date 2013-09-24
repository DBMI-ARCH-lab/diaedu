Discourse.KbObjPageController = Discourse.ObjectController.extend({
  needs: ["application", "kbObj"],

  dataType: function() {
    return this.get('controllers.kbObj.model');
  }.property('controllers.kbObj'),

  showMode: function() {
    return this.get('controllers.application.currentPath') == 'kb_obj.show';
  }.property('controllers.application.currentPath'),

  changePage: function(newPage) {
    
  }
});
