Ember.RSVP.configure('onerror', function(e) {
  console.log('ERROR:', e);
  if (e) {
    console.log("MESSAGE:", e.message);
    console.log("STACK:", e.stack);
  }
});