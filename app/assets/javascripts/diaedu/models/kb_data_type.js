Discourse.KbDataType = Discourse.Model.extend({
  name: null,
  shortName: null,
  rank: null,

  title: function() {
    return I18n.t('kb.' + this.get('shortName') + '.title.other');
  }.property('shortName'),

  singularTitle: function() {
    return I18n.t('kb.' + this.get('shortName') + '.title.one');
  }.property('shortName'),

  className: function() {
    return this.get('shortName').slice(0,-1);
  }.property('shortName'),

  // returns the next data type in the hierarchy
  next: function() {
    return Discourse.KbDataType.instances[this.get('rank')];
  }.property('rank')
  
});

Discourse.KbDataType.reopenClass({
  byName: null,

  get: function(which) { var self = this;
    // if which is an integer, just return that one
    if (typeof(which) == 'number')
      return this.instances[which];
    else {
      // build the hash if not built already
      if (!this.byName) {
        this.byName = {};
        this.instances.forEach(function(dt){ self.byName[dt.name] = dt; });
      }
      return this.byName[which];
    }
  },

  instances: [
    Discourse.KbDataType.create({
      name: 'glycemic-problems',
      shortName: 'glyprobs',
      rank: 1
    }),
    Discourse.KbDataType.create({
      name: 'triggers',
      shortName: 'triggers',
      rank: 2
    }),
    Discourse.KbDataType.create({
      name: 'goals',
      shortName: 'goals',
      rank: 3
    })
  ]
});

