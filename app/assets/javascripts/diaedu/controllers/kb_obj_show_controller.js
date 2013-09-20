Discourse.KbObjShowController = Ember.ObjectController.extend({
  needs: ["kbObj"],

  // loading is initially true
  loading: true,

  loaded: false,

  loadFailed: false
});
