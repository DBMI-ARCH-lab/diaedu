Discourse.KbDataType = Discourse.Model.extend({
  // fields:
  // name - the longer hyphenated name for the type, e.g. glycemic-problems
  // shortName - a one-word name for the type, e.g. glyprobs, triggers
  // abbrv - a two letter abbreviation

  title: function() {
    return I18n.t('diaedu.' + this.get('shortName') + '.title.other');
  }.property('shortName'),

  singularTitle: function() {
    return I18n.t('diaedu.' + this.get('shortName') + '.title.one');
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

  findByAbbrv: function(abbrv) { var self = this;
    return self.instances.filter(function(dt){ return dt.get('abbrv') == abbrv; })[0];
  },

  // total number of instances
  count: 4,

  instances: [
    Discourse.KbDataType.create({
      name: 'glycemic-problems',
      shortName: 'glyprobs',
      abbrv: 'gp'
    }),
    Discourse.KbDataType.create({
      name: 'triggers',
      shortName: 'triggers',
      abbrv: 'tr'
    }),
    Discourse.KbDataType.create({
      name: 'barriers',
      shortName: 'barriers',
      abbrv: 'br'
    }),
    Discourse.KbDataType.create({
      name: 'goals',
      shortName: 'goals',
      abbrv: 'gl'
    })
  ]
});

