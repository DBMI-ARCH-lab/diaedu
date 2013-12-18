// models a trail from glyprob to trigger to goal
Discourse.KbBreadcrumb = Discourse.Model.extend({

  glyprob: null,
  trigger: null,
  barrier: null,
  goal: null,

  crumbs: function() {
    return Em.A([
      {type: Discourse.KbDataType.get(0), obj: this.get('glyprob')},
      {type: Discourse.KbDataType.get(1), obj: this.get('trigger')},
      {type: Discourse.KbDataType.get(2), obj: this.get('barrier')},
      {type: Discourse.KbDataType.get(3), obj: this.get('goal')}
    ]);
  }.property('glyprob', 'trigger', 'barrier', 'goal'),

  // creates a new Breadcrumb and adds the given crumb
  addCrumb: function(crumb) {
    var bc = Discourse.KbBreadcrumb.create();
    bc.set('glyprob', this.get('glyprob'));
    bc.set('trigger', this.get('trigger'));
    bc.set('barrier', this.get('barrier'));
    bc.set('goal', this.get('goal'));
    bc.set(crumb.get('dataType.singularShortName'), crumb);
    return bc;
  },

  removeCrumb: function(crumb) {
    var bc = Discourse.KbBreadcrumb.create();
    bc.set('glyprob', this.get('glyprob'));
    bc.set('trigger', this.get('trigger'));
    bc.set('barrier', this.get('barrier'));
    bc.set('goal', this.get('goal'));
    bc.set(crumb.get('dataType.singularShortName'), null);
    return bc;
  },

  merge: function(other) { var self = this;
    'glyprob trigger barrier goal'.w().forEach(function(t){
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

      // create a metacrumb, which will get added to the reconstructed breadcrumb objects
      // since those objects also need breadcrumbs
      var metaCrumb = Discourse.KbBreadcrumb.create();

      // start with the appropriate data type (usually rank 1 (0) unless this is not a full trail)
      var dt = Discourse.KbDataType.get(obj.get('dataType.rank') - bits.length);

      // walk backwards up the trail
      bits.slice(1).forEach(function(id){
        // create the next breadcrumb object
        var crumb = dt.get('modelClass').create({id: id});

        // add the current crumb to the meta crumb (this creates a new crumb)
        // and set on the current crumb
        metaCrumb = metaCrumb.addCrumb(crumb);
        crumb.set('breadcrumb', metaCrumb);

        // load the name (right now we only have the id)
        crumb.loadFully();

        // add the current crumb to the reconstructed trail
        bc.set(dt.get('singularShortName'), crumb);

        // go to next data type down the line
        dt = dt.get('next');
      });
    }

    return bc;
  }
});