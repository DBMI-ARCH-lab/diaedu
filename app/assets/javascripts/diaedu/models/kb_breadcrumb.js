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
  }.property('glyprob', 'trigger', 'goal')

});