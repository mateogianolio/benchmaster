# benchmaster

A small wrapper around [Benchmark.js](http://benchmarkjs.com). Written to run synchronous benchmarks with minimal hassle and with as little code as possible.

```bash
$ npm install benchmaster
```

### Syntax

```javascript
bench = function (functions, [fill], [callback])
```

- `functions`
  - object to benchmark, either one function, functions in an array (`[f, g]`) or custom-named functions in a array of tuples (`[['add', function (a, b) { return a + b; }]]`).
- `[fill]`
  - argument filler function, gets called on every cycle and looks like this: `function ([name], [pos])`, where `name` is the name of the function and `pos` is the argument index.
- `[callback]`
  - called with a `data` object when benchmark is done (if no callback is found the results of the benchmarks are printed to `stdout`).

### Examples

Let's start off with the simplest example:

```javascript
var bench = require('benchmaster');

bench(Math.sin);
// sin x 8,797,665 ops/sec ±1.55% (85 runs sampled)

bench([Math.sin, Math.cos, Math.tan]);
// sin x 9,136,143 ops/sec ±0.72% (89 runs sampled)
// cos x 8,885,802 ops/sec ±0.85% (92 runs sampled)
// tan x 7,802,008 ops/sec ±0.73% (90 runs sampled)
```

Above examples will automatically fill all missing arguments with `Math.random()` every cycle (this is the standard behaviour).

**Using the callback function**

```javascript
bench(
  [Math.sin, Math.cos, Math.tan],
  null,
  function (data) {
    for (var target in data)
      if (data.hasOwnProperty(target))
        console.log(String(data[target]));
  }
);
```

**Using custom arguments**

```javascript
// Generate arguments once before the benchmarks begin
function fillOnce() {
  return -1 + Math.random() * 2;
}

// If fillOnce gives us the value -0.15,
// the benchmark will run Math.sin(-0.15) every cycle

bench(Math.sin, fillOnce);

// Generate arguments every cycle
function fillEvery() {
  return function () {
    return -1 + Math.random() * 2;
  };
}

// In contrast to above, here the inner function
// will generate new arguments every cycle

bench(Math.sin, fillEvery);
```
