# Enumeration

------

In this article we'll look at JavaScript's enumeration capabilities. This is partly related to scope, so take a look at [JS101: A Brief Lesson on Scope](scope.html) if you haven't read it yet.

## Correctly Using `for-in`

The [for-in statement](http://es5.github.io/#x12.6.4) is intended to be used to enumerate over the properties of an object. Inherited properties are included, and to avoid iterating over them `hasOwnProperty` should be used.

This example demonstrates using for-in, and shows what happens when someone adds a property to a native prototype:

```javascript
Object.prototype.bad = undefined;

var name, names;

names = {
  bill: { age: 44 }
, bob: { age: 22 }
, john: { age: 29 }
};

for (var name in names) {
  if (names.hasOwnProperty(name)) {
    console.log(name, names[name].age);
  } else {
    console.log('Inherited:', name);
  }
}
```

The output will show the inherited property that we don't want. Even though the property has been set to `undefined`, it still exists and will be present when enumerated over. Some libraries may add properties this way (even though it's generally considered bad practice), so it's wise to use the following pattern:

```javascript
for (var prop in exampleObject) {
  if (exampleObject.hasOwnProperty(prop)) {
    // Do stuff
  }
}
```

The Underscore.js library uses the same pattern in its [implementation of _.each](https://github.com/documentcloud/underscore/blob/2eb8d2de5cfd636e46e0a4fb4640f3ff8ff6d7d9/underscore.js#L83-88):

```javascript
for (var key in obj) {
  if (_.has(obj, key)) {
    if (iterator.call(context, obj[key], key, obj) === breaker) return;
  }
}
```

## Correctly Extending Objects

In ECMAScript 5, properties have an `enumerable` attribute. If this is set to fault, then the property won't be included in a loop with for-in. There's also a method called `Object.prototype.propertyIsEnumerable`, and methods like `Object.keys` will respect it.

If I really wanted to add a property to `Object`, then I could take advantage of this to correctly extend the built-in object:

```javascript
Object.defineProperty(Object.prototype, 'bad', {
   value: undefined
 , enumerable: false // This property is not enumerable
});

var name, names;

names = {
  bill: { age: 44 }
, bob: { age: 22 }
, john: { age: 29 }
};

for (var name in names) {
  if (names.hasOwnProperty(name)) {
    console.log(name, names[name].age);
  } else {
    console.log('Inherited:', name);
  }
}
```

Running this example will leave out the `bad` property.

Notice that this doesn't just apply to adding properties to native objects -- you should also take `enumerable` into account when adding properties to your own objects.

## ECMAScript 5 Array.prototype Methods

ECMAScript 5 introduces some handy methods to `Array.prototype`:

- `forEach(callback)`: Run `callback` over each element
- `filter(callback)`: Returns a new array for each item where `callback` returns true
- `map(callback)`: Run `callback` over each element, store the result, then return a new array containing the results
- `some(callback)`: If `callback` returns true, then stop iterating and return true

There are more methods, including `indexOf`, `lastIndexOf`, `reduce`, and `reduceRight`. These methods also take a `thisArg` parameter, which changes the value of `this` in the callback.

Remember that these are all methods on `Array`. To use them with an object, one approach is to call `Object.keys`. The previous example could be rewritten like this:

```javascript
var name, names;

names = {
  bill: { age: 44 }
, bob: { age: 22 }
, john: { age: 29 }
};

Object.keys(names).forEach(function(name) {
  console.log(name);
});
```

## Scope

In [JS101: A Brief Lesson on Scope](scope.html), I provided an example that showed how creating methods inside loops can cause confusing scope issues. Since `forEach` uses a callback, we now have a new scope for each iteration:

```javascript
function example() {
  var o = {};

  [0, 1, 2, 3].forEach(function(i) {
    o[i] = function() { console.log(i); };
  });

  o[0]();
  o[1]();
  o[2]();
}

example();
```

This will correctly output `0 1 2` rather than the `3 3 3` that was printed with the for example.

## Performance

If you're working with an array of items, a simple `for` loop will still perform better than `forEach`:

```javascript
var length = values.length, i;
for (i = 0; i < length; i++) {
  // Do something
}
```

There are dozens of benchmarks for this on [jsPerf](http://jsperf.com/), but in general the good old fashioned `for` loop will beat `forEach`.

## Relationship to Underscore.js

[Underscore.js](http://underscorejs.org/) and jQuery both include methods that work like `forEach`. This makes it easier to write code that'll work with older browsers.

Underscore works slightly different to `forEach` because it doesn't extend `Array.prototype`, or any other built-in object. Instead, the array has to be passed as an argument:

```javascript
_.forEach([0, 1, 2], function(i) {
  console.log(i);
});
```

The ECMAScript 5 `forEach` method will be used if it's available, otherwise a `for` loop will be used instead.
