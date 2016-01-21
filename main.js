(function () {
  'use strict';

  var benchmark = require('benchmark'),
      suite;

  module.exports = function (functions, fill, callback) {
    suite = new benchmark.Suite();
    functions = functions instanceof Function ? [ functions ] : functions;
    functions.forEach(function (f) {
      var args = [],
          i;

      for (i = 0; i < f.length; i++)
        args.push(fill ? fill() : Math.random);

      suite.add(f.name, function () {
        // generate new arguments every cycle
        f(...args.map(function (argument) {
          if (argument instanceof Function)
            return argument();
        }));
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
