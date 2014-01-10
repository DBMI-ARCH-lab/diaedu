// a wrapper for the Discourse.ajax function that converts any outgoing data keys into snake_case, and vice versa for incoming data
Discourse.cleanAjax = function() {

  var snakeToCamel = function(s) { return s.replace(/(\_[a-z])/g, function($1){return $1.toUpperCase().replace('_','');}); };
  var camelToSnake = function(s) { return s.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();}); };

  var transformHash = function(hash, transformer) {
    var newHash = {};

    for (var k in hash) {
      // recurse if nested hash
      if (hash[k] && hash[k].constructor == Object)
        hash[k] = transformHash(hash[k], transformer);

      // transform the key
      newHash[transformer(k)] = hash[k];
    }

    return newHash;
  };

  // transform outgoing to snake
  if (arguments[1] && arguments[1].data) {
    arguments[1].data = transformHash(arguments[1].data, camelToSnake);
  }

  // send ajax
  return Discourse.ajax(arguments[0], arguments[1]).then(function(data){
    // transform incoming to camel
    return transformHash(data, snakeToCamel);
  });
};
