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

  singularShortName: function() {
    return this.get('shortName').slice(0,-1);
  }.property('shortName'),

  modelClass: function() {
    return Discourse['Kb' + this.get('singularShortName').capitalize()];
  }.property('shortName'),

  backendPath: function() {
    return '/kb/' + this.get('name');
  }.property('name'),

  // returns the previous data type in the hierarchy
  prev: function() {
    return Discourse.KbDataType.instances[this.get('rank') - 2];
  }.property('rank'),

  // returns the next data type in the hierarchy
  next: function() {
    return Discourse.KbDataType.instances[this.get('rank')];
  }.property('rank'),

  hasNext: function() {
    return this.get('rank') < Discourse.KbDataType.instances.length;
  }.property('rank'),

  iconPath: function() {
    return '/assets/diaedu/' + this.get('shortName') + '-active.png';
  }.property('shortName'),

  smallerIconPath: function() {
    return '/assets/diaedu/' + this.get('shortName') + '-smaller.png';
  }.property('shortName'),
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
      name: 'barriers',
      shortName: 'barriers',
      rank: 3
    }),
    Discourse.KbDataType.create({
      name: 'goals',
      shortName: 'goals',
      rank: 4
    })
  ]
});

