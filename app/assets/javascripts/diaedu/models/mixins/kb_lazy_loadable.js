// mixin allowing properties to be lazy loaded
Discourse.KbLazyLoadable = Ember.Mixin.create({

  // if propName exists as a property on the object, returns it immediately
  // otherwise, calls the callback and sets the property to whatever it resolves to
  // and returns tempValue in the meantime
  lazyLoad: function(propName, tempValue, callback) { var self = this;
    // if already defined, resolve right away
    if (typeof(this.get(propName)) != 'undefined')
      return this.get(propName);

    // otherwise do callback and add .then call to set property
    else { 
      callback().then(function(x){ self.set(propName, x); });
      return tempValue;
    }
  }
});