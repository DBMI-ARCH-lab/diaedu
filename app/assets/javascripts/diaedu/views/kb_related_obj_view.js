Discourse.KbRelatedObjView = Discourse.View.extend({
  templateName: 'diaedu/templates/kb_objs/related',

  didInsertElement: function() { var self = this;
    this.$('select').multiselect();
  }
});