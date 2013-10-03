// models a trail from glyprob to trigger to goal
Discourse.KbBreadcrumb = Discourse.Model.extend({

  glyprob: null,
  trigger: null,
  goal: null,

  crumbs: function() {
    return Em.A([
      {type: Discourse.KbDataType.get(0), obj: this.get('glyprob')},
      {type: Discourse.KbDataType.get(1), obj: this.get('trigger')},
      {type: Discourse.KbDataType.get(2), obj: this.get('goal')}
    ]);
  }.property('glyprob', 'trigger', 'goal'),

  // creates a new Breadcrumb and adds the given crumb
  addCrumb: function(crumb) {
    var bc = Discourse.KbBreadcrumb.create();
    bc.set('glyprob', this.get('glyprob'));
    bc.set('trigger', this.get('trigger'));
    bc.set('goal', this.get('goal'));
    bc.set(crumb.get('dataType.singularShortName'), crumb);
    return bc;
  },

  merge: function(other) { var self = this;
    'glyprob trigger goal'.w().forEach(function(t){
      if (!self.get(t)) self.set(t, other.get(t));
    });
  },

  serialized: function() {
    // start with the first non-null crumb and add each id
    var ids = [];
    this.get('crumbs').forEach(function(c){
      if (c.obj) ids.push(c.obj.get('id'));
    });

    // remove the last id as we don't include the current obj in the serialized version
    ids.pop();

    return ids.length == 0 ? '' : 'trail-' + ids.join('-');
  }.property('crumbs')
});

Discourse.KbBreadcrumb.reopenClass({
  reconstruct: function(obj, str) {
    var bc = Discourse.KbBreadcrumb.create().addCrumb(obj);

    var bits = str.split('-');

    if (bits.length > 0) {
      var dt = Discourse.KbDataType.get(0);
      var metaCrumb = Discourse.KbBreadcrumb.create();
      bits.slice(1).forEach(function(id){
        var crumb = dt.get('modelClass').create({id: id});
        metaCrumb = metaCrumb.addCrumb(crumb);
        crumb.set('breadcrumb', metaCrumb);
        crumb.loadFully();
        bc.set(dt.get('singularShortName'), crumb);
        dt = dt.get('next');
      });
    }

    console.log(bc);

    return bc;
  }
});