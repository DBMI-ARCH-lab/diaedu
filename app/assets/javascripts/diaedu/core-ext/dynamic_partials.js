// special handlerbars helper that allows loading dynamic partials
Ember.Handlebars.helper('dynPartial', function(name, options) {
  return Ember.Handlebars.helpers.partial.apply(this, arguments);
});