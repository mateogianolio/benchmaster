(function () {
  'use strict';

  var benchmark = require('benchmark'),
      suite;

  function resolve(args) {
    var out = [];
    for (var i = 0; i < args.length; i++)
      if (typeof args[i] === 'function')
        out[i] = args[i]();

    return out;
  }

  module.exports = function (functions, fill, callback) {
    suite = new benchmark.Suite();

    functions = functions instanceof Function ?
      [ functions ] :
      functions;

    functions.forEach(function (f, index) {
      var args = [],
          name,
          i;

      if (f instanceof Array) {
        name = f[0];
        f = f[1];
      } else
        name = f.name && f.name !== 'bound' ? f.name : String(index);

      var length = f.length;
      for (i = 0; i < length; i++)
        args.push(fill ? fill(name, i) : Math.random);

      suite.add(name, function () {
        f.apply(null, length ? resolve(args) : args);
      });
    });

    var data = {};
    suite
      .on('cycle', function (event) {
        data[event.target.name] = event.target;
        if (!callback)
          console.log(String(event.target));
      })
      .on('complete', function () {
        if (callback)
          callback(data);
      })
      .run();
  };
}());
