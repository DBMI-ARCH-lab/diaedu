// route for patient plan
Discourse.KbPlanRoute = Discourse.Route.extend({
  model: function(params, transition) {
    // reconstruct breadcrumb from params
    return Discourse.KbBreadcrumb.reconstruct(params.breadcrumb);
  },

  setupController: function(controller, model) {
    console.log("model", model);
    console.log('lastCrumb', model.get('lastCrumb'));
    console.log("popped", model.get('popped'));
    // set title to something basic while loading
    Discourse.set('title', I18n.t('diaedu.patient_plan.patient_plan'));
    controller.set('model', model);
  },

  renderTemplate: function() {
    this.render('javascripts/diaedu/templates/plan');
  },

  serialize: function(model) {
    return {breadcrumb: model.get('serialized')};
  }
});
