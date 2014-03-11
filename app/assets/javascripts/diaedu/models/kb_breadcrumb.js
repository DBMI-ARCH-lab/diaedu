// models a trail through the chain of data types
Discourse.KbBreadcrumb = Discourse.Model.extend({

  // the array of KbObj descendants
  crumbs: null,

  // returns a string representation of this breadcrumb
  serialized: function() { var self = this;
    return self.serialize(self.get('crumbs').slice(0, -1));
  }.property('crumbs.@each'),

  // returns the same style string as .serialized but does not remove the last crumb
  serializedWithLast: function() { var self = this;
    return self.serialize(self.get('crumbs'));
  }.property('crumbs.@each'),

  // whether this breadcrumb has a crumb in the last position
  // that is, with no forward relations
  hasEndCrumb: function() { var self = this;
    return self.get('crumbs').filterBy('isEndPoint').length > 0;
  }.property('crumbs.@each'),

  // gets last crumb
  lastCrumb: function() { var self = this;
    return self.get('crumbs.lastObject');
  }.property('crumbs.@each'),

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
  add: function(crumb) { var self = this;
    var newBc = self.clone();
    newBc.get('crumbs').push(crumb);
    return newBc;
  },

  // clones this breadcrumb and removes the last N crumbs
  pop: function(num) { var self = this;
    var newBc = self.clone();
    for (var i = 0; i < num; i++) {
      newBc.get('crumbs').pop();
    }
    return newBc;
  },

  // converts an array of crumbs into a serialized string
  serialize: function(crumbs) { var self = this;
    var ids = crumbs.map(function(c){ return c.get('dataType.abbrv') + c.get('id'); });
    return ids.length == 0 ? '' : 'trail-' + ids.join('-');
  }
});

Discourse.KbBreadcrumb.reopenClass({

  // creates a breadcrumb from a serialized string
  reconstruct: function(str) {
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
        metaCrumb = metaCrumb.add(crumb);
        crumb.set('breadcrumb', metaCrumb);

        // load the name and description (right now we only have the id)
        // we need the description for the patient view
        crumb.loadFully();

        // add the current crumb to the reconstructed trail
        breadcrumb.get('crumbs').push(crumb);
      });
    }

    return breadcrumb;
  }
});