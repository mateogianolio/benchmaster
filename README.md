# Benchmaster

Benchmaster is a wrapper around the awesome [Benchmark.js](http://benchmarkjs.com). It was written to run benchmarks with minimal hassle and with as little code as possible.

```bash
$ npm install benchmaster
```

### Syntax

```javascript
benchmaster = function (functions, [fill], [callback])
```

- `functions`
  - function(s) to benchmark
- `[fill]`
  - argument filler function, gets called on every cycle and looks like this: `function (name, pos)`, where `name` is the name of the function and `pos` is the argument index.
- `[callback]`
  - called with a `data` object when benchmark is done (if no callback is found the results of the benchmarks are printed to `stdout`)

### Examples

Let's start off with the simplest example:

```javascript
var benchmaster = require('benchmaster');

benchmaster(Math.sin);
// sin x 1,283,678 ops/sec ±1.62% (88 runs sampled)

benchmaster([Math.sin, Math.cos, Math.tan]);
// sin x 1,305,326 ops/sec ±1.31% (85 runs sampled)
// cos x 1,309,873 ops/sec ±1.54% (83 runs sampled)
// tan x 1,297,499 ops/sec ±1.14% (89 runs sampled)
```

Above examples will automatically fill all missing arguments with `Math.random()` every cycle (this is the standard behaviour).

**Using the callback function**

```javascript
benchmaster(
  [Math.sin, Math.cos, Math.tan],
  null,
  function (data) {
    for (var target in data)
      if (data.hasOwnProperty(target))
        console.log(String(data[target]));
  }
);
// sin x 1,305,326 ops/sec ±1.31% (85 runs sampled)
// cos x 1,309,873 ops/sec ±1.54% (83 runs sampled)
// tan x 1,297,499 ops/sec ±1.14% (89 runs sampled)
```

**Using custom arguments**

```javascript
// Generate arguments once before the benchmarks begin
function fillOnce() {
  return -1 + Math.random() * 2;
}

// If fillOnce gives us the value -0.15,
// the benchmark will run Math.sin(-0.15) every cycle

benchmaster(Math.sin, fillOnce);

// Generate arguments every cycle
function fillEvery() {
  return function () {
    return -1 + Math.random() * 2;
  };
}

// In contrast to above, here the inner function
// will generate new arguments every cycle

benchmaster(Math.sin, fillEvery);
```
