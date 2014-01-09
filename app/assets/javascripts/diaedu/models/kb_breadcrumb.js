// models a trail through the chain of data types
Discourse.KbBreadcrumb = Discourse.Model.extend({

  // the array of KbObj descendants
  crumbs: null,

  // returns a string representation of this breadcrumb
  serialized: function() { var self = this;
    // get crumb ids and type abbreviations
    var ids = self.get('crumbs').map(function(c){ return c.get('dataType.abbrv') + c.get('id'); });

    // remove the last id as we don't include the current obj in the serialized version
    ids.pop();

    return ids.length == 0 ? '' : 'trail-' + ids.join('-');
  }.property('crumbs'),

  init: function() { var self = this;
    self._super();

    // initialize crumbs array if not already set
    if (!self.get('crumbs')) {
      self.set('crumbs', Em.A());
    }
  },

  // creates a new breadcrumb with the same crumbs
  clone: function() { var self = this;
    return Discourse.KbBreadcrumb.create({crumbs: self.get('crumbs').slice(0)});
  },

  // clones this breadcrumb and adds a new crumb
  addCrumb: function(crumb) { var self = this;
    var newBc = self.clone();
    newBc.get('crumbs').push(crumb);
    return newBc;
  },

  // clones this breadcrumb and removes the given crumb
  removeCrumb: function(crumb) { var self = this;
    var newBc = self.clone();
    idx = newBc.get('crumbs').indexOf(crumb);
    newBc.get('crumbs').splice(idx, 1);
    return newBc;
  }

});

Discourse.KbBreadcrumb.reopenClass({

  // creates a breadcrumb from a serialized string and adds the given kb obj
  reconstruct: function(obj, str) {
    var breadcrumb = Discourse.KbBreadcrumb.create();

    // split the param string
    var bits = str.split('-');

    if (bits.length > 0) {

      // create a metacrumb, which will get added to the reconstructed breadcrumb objects
      // since those objects also need breadcrumbs
      var metaCrumb = Discourse.KbBreadcrumb.create();

      // discard the 'trail' part and iterate
      bits.slice(1).forEach(function(bit){

        // get the data type from the abbreviation
        var dataType = Discourse.KbDataType.findByAbbrv(bit.substr(0,2));

        // create the next crumb
        var crumb = dataType.get('modelClass').create({id: parseInt(bit.substr(2))});

        // add the current crumb to the meta crumb (this creates a new crumb)
        // and set on the current crumb
        metaCrumb = metaCrumb.addCrumb(crumb);
        crumb.set('breadcrumb', metaCrumb);

        // load the name (right now we only have the id)
        crumb.loadFully();

        // add the current crumb to the reconstructed trail
        breadcrumb.get('crumbs').push(crumb);
      });
    }

    return breadcrumb.addCrumb(obj);
  }
});