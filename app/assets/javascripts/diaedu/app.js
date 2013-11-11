Ember.RSVP.configure('onerror', function(e) {
  if (e) {
    console.log('ERROR:', e);
    console.log("MESSAGE:", e.message);
    console.log("STACK:", e.stack);
  }
});