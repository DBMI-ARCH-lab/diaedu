Ember.RSVP.configure('onerror', function(e) {
  console.log(e.message); 
  console.log(e.stack);
});