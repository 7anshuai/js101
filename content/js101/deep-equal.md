# Deep Equal

------

Back in [JS101: Equality](equality.html) I wrote about the difference between `==` and `===`. This is one area of the language that quite clearly causes issues for beginners. In addition, there is another equality concept that can come in handy when writing tests: deep equal. It also illustrates some of the underlying mechanics of the language. As an intermediate JavaScript developer, you should have at least a passing familiarity with __deepEqual__ and how it works.

## Unit Testing/1.0

Deep equality is defined in [CommonJS Unit Testing/1.0](http://wiki.commonjs.org/wiki/Unit_Testing/1.0), under subsection 7. The algorithm assumes two arguments: `expected` and `actual`. The purpose of the algorithm is to determine if the values are equivalent. It supports both primitive values and objects.

1. Strict equals (`===`) means the values are equivalent
2. Compare dates using the `getTime` method
3. If values are not objects, compare with `==`
4. Otherwise, compare each object's size, keys, and values

The fourth point is probably what you would assume deep equality actually means. The other stages reveal things about the way JavaScript works -- the third stage means values that are not objects can easily be compared with `==` because they're primitive values (Undefined, Null, Boolean, Number, or String).

The second step works because `getTime` is the most convenient way of comparing dates:

```javascript
var assert = require('assert')
  , a = new Date(2012, 1, 1)
  , b = new Date(2012, 1, 1)
  ;

assert.ok(a !== b);
assert.ok(a != b);
assert.ok(a.getTime() == b.getTime());
assert.deepEqual(a, b);
```

This script can be run in Node, or with a suitable CommonJS assertion library. It illustrates the point that dates are not considered equal using the equality or strict equality operators -- the easiest way to compare them is with `getTime`.

Object comparison implies [recursion](http://en.wikipedia.org/wiki/Recursion_(computer_science)), as some values may also be objects. Also, key comparison isn't as simple as it might seem: [real implementations sort keys, compare length, then compare each value](https://github.com/joyent/node/blob/e4cef1a0833e6d677298600e205a142d15639bf2/lib/assert.js#L221-L233).

## Bugs

Bugs have been found in the Unit Testing/1.0 specification since it originally appeared. Two have been flagged up on the [main Unit Testing page](http://wiki.commonjs.org/wiki/Unit_Testing). The Node `assert` module addresses these points. For example, [regular expressions are a special case in the **deepEqual** implementation](https://github.com/joyent/node/blob/e4cef1a0833e6d677298600e205a142d15639bf2/lib/assert.js#L174-L179):

```javascript
return actual.source === expected.source &&
       actual.global === expected.global &&
       actual.multiline === expected.multiline &&
       actual.lastIndex === expected.lastIndex &&
       actual.ignoreCase === expected.ignoreCase;
```

The `source` property has a string that represents the original regular expression, and then each flag has to be compared.

## Object Comparison

The next time you're writing a test, or even just comparing objects, remember that `==` will only work for "shallow" comparisons. Testing other values like arrays, dates, regular expressions, and objects requires a little bit more effort.
