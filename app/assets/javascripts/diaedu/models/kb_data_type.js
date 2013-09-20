Discourse.KbDataType = Discourse.Model.extend({
  name: null,
  shortName: null,
  
  title: function() {
    return I18n.t('kb.' + this.get('shortName') + '.title.other');
  }.property('shortName'),

  singularTitle: function() {
    return I18n.t('kb.' + this.get('shortName') + '.title.one');
  }.property('shortName'),

  className: function() {
    return this.get('shortName').slice(0,-1);
  }.property('shortName')
});

Discourse.KbDataType.reopenClass({
  find: function(name) {
    return Discourse.KbDataType.instances[name];
  },

  all: function() {
    var a = [];
    for (var key in Discourse.KbDataType.instances)
      a.push(Discourse.KbDataType.instances[key]);
    return a;
  },

  instances: {
    'glycemic-problems': Discourse.KbDataType.create({
      name: 'glycemic-problems',
      shortName: 'glyprobs'
    }),
    'triggers': Discourse.KbDataType.create({
      name: 'triggers',
      shortName: 'triggers'
    }),
    'goals': Discourse.KbDataType.create({
      name: 'goals',
      shortName: 'goals'
    })
  }
});

