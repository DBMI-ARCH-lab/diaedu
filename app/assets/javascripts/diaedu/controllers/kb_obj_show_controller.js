Discourse.KbObjShowController = Ember.ObjectController.extend({
  needs: ["kbObj"],

  // loading is initially true
  loading: true,

  loaded: false,

  loadFailed: false,

  relatedObjPage: null,

  relatedObjHeading: function() {
    return I18n.t('kb.' + this.get('controllers.kbObj.model.next.shortName') + '.related_heading');
  }.property('controllers.kbObj')
});
