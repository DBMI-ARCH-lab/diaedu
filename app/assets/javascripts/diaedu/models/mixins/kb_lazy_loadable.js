Discourse.KbLazyLoadable = Ember.Mixin.create({
  lazyLoad: function(propName, deferred) { var self = this;
    deferred.done(function(res){
      self.set(propName, res);
    }).fail(function(res){
      console.log('FAIL', res);
    });
  }
});