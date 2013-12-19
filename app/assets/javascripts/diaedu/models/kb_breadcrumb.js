// models a trail through the chain of data types
Discourse.KbBreadcrumb = Discourse.Model.extend({

  crumbs: null,

  init: function() { var self = this;
    self._super();

    // initialize crumbs array if not already set
    if (!this.get('crumbs')) {
      self.set('crumbs', Em.A());
      for (var i = 0; i < Discourse.KbDataType.count; i++)
        self.get('crumbs').push(null);
    }
  },

  // creates a new breadcrumb with the same crumbs
  clone: function() { var self = this;
    return Discourse.KbBreadcrumb.create({crumbs: self.get('crumbs').slice(0)});
  },

  // clones this breadcrumb and adds a new crumb
  addCrumb: function(crumb) { var self = this;
    var newBc = self.clone();
    newBc.crumbs[crumb.get('dataType.rank')] = crumb;
    return newBc;
  },

  // clones this breadcrumb and removes the given crumb
  removeCrumb: function(crumb) { var self = this;
    var newBc = self.clone();
    newBc.crumbs[crumb.get('dataType.rank')] = null;
    return newBc;
  },

  // replaces any missing crumbs in this breadcrumb with those from the given breadcrumb
  merge: function(other) { var self = this;
    self.get('crumbs').forEach(function(c, idx){
      if (c === null)
        self.get('crumbs')[idx] = other.get('crumbs')[idx];
    });
  },

  // returns a string representation of this breadcrumb
  serialized: function() { var self = this;
    // get crumb ids
    var ids = self.get('crumbs').map(function(c){ return c ? c.get('id') : null; }).compact();

    // remove the last id as we don't include the current obj in the serialized version
    ids.pop();

    return ids.length == 0 ? '' : 'trail-' + ids.join('-');
  }.property('crumbs'),

  // returns an array of objects of the form {crumb: KbObj, dataType: KbDataType}
  // useful for template to get data types if some crumbs are null
  crumbsWithDataTypes: function() { var self = this;
    return self.get('crumbs').map(function(c,i){ return {dataType: Discourse.KbDataType.instances[i], crumb: c}; });
  }.property('crumbs')
});

Discourse.KbBreadcrumb.reopenClass({

  // creates a breadcrumb from a serialized string and adds the given kb obj
  reconstruct: function(obj, str) {
    var bc = Discourse.KbBreadcrumb.create().addCrumb(obj);

    // split the param string
    var bits = str.split('-');

    if (bits.length > 0) {

      // create a metacrumb, which will get added to the reconstructed breadcrumb objects
      // since those objects also need breadcrumbs
      var metaCrumb = Discourse.KbBreadcrumb.create();

      // start with the appropriate data type (usually rank 0 unless this is not a full trail)
      var dt = Discourse.KbDataType.get(obj.get('dataType.rank') - bits.length + 1);

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
        bc.get('crumbs')[dt.get('rank')] = crumb;

        // go to next data type down the line
        dt = dt.get('next');
      });
    }

    return bc;
  }
});