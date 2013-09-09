Discourse.KbObjIndexListView = Discourse.View.extend({
  templateName: 'diaedu/templates/kb_objs/index_list',

  didInsertElement: function() {
    // if there is a toHighlight set, honor it
    var toHighlight = this.get('controller.controllers.kbObj.toHighlight');
    if (toHighlight != null) {
      this.highlightRow(this.$().find('div#obj-' + toHighlight));
    }
  },

  highlightRow: function(row) {
    var originalCol = row.css('backgroundColor');
    row.css({
      backgroundColor: "#ffffcc"
    }).animate({
      backgroundColor: originalCol
    }, 2000);
  }
});

