Discourse.KbLazyLoadable = Ember.Mixin.create({
  lazyLoad: function(propName, defaultVal, callback) { var self = this;
    if (typeof(this.get(propName)) != 'undefined')
      return this.get(propName);
    else {
      var res = callback();
      if (res.promise) {
        res.done(function(res2){
          self.set(propName, res2);
        }).fail(function(res2){
          console.log('FAIL', res2);
        });
        return defaultVal;
      } else
        return res;
    }
  }
});