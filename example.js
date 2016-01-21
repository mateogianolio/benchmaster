(function () {
  'use strict';

  var benchmaster = require('./main');

  benchmaster(Math.sin);
  console.log('...');

  benchmaster([Math.sin, Math.cos, Math.tan]);
  console.log('...');
}());
