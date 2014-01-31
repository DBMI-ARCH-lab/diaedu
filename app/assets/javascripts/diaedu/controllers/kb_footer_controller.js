// controller for the site-wide footer we add
Discourse.KbFooterController = Discourse.ObjectController.extend({
  actions: {
    // goes to the active admin home
    goToKbAdmin: function() {
      window.location.href = '/kb_admin';
    }
  }
});