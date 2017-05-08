# Equality

--------

> 原文链接：http://dailyjs.com/post/equality

There are four equality operators in JavaScript:

- Equals: `==`
- Not equal: `!=`
- Strict equal: `===`
- Strict not equal: `!==`

In JavaScript: [The Good Parts](http://www.amazon.co.uk/gp/product/0596517742/ref=as_li_qf_sp_asin_tl?ie=UTF8&tag=da0b-21&linkCode=as2&camp=1634&creative=6738&creativeASIN=0596517742), Douglas Crockford advises against using `==` and `!=`:

> My advice is to never use the evil twins. Instead, always use `===` and `!==`.

The result of the equals operator is calculated based on [The Abstract Equality Comparison Algorithm](http://es5.github.io/#x11.9.3). This can lead to confusing results, and these examples are often cited:

```javascript
'' == '0'           // false
0 == ''             // true
0 == '0'            // true

false == undefined  // false
false == null       // false
null == undefined   // true
```

Fortunately, we can look at the algorithm to better understand these results. The first example is `false` due to this rule:

> If Type(x) is String, then return `true` if x and y are exactly the same sequence of characters (same length and same characters in corresponding positions). Otherwise, return `false`.

Basically, the sequence of strings is not the same. In the second example, the types are different, so this rule is used:

> If Type(x) is `Number` and Type(y) is `String`, return the result of the comparison x == ToNumber(y).

This is where the behaviour of the `==` starts to get seriously gnarly: behind the scenes, values and objects are changed to different types. The equality operator always tries to compare [primitive values](primitives-value-and-objects.html), whereas the strict equality operator will return `false` if the two values are not the same type. For reference, the underlying mechanism used by the strict equality operator is documented in the [The Strict Equality Comparison Algorithm](http://es5.github.io/#x11.9.6) section in the ECMAScript Specification.

## Strict Equality Examples

Using the same example with the strict equality operator shows an arguably more intuitive result:

```javascript
'' === '0'           // false
0 === ''             // false
0 === '0'            // false

false === undefined  // false
false === null       // false
null === undefined   // false
```

Is this really how professional JavaScript developers write code? And if so, does `===` get used that often? Take a look at [ajax.js](https://github.com/jquery/jquery/blob/05337e78fa68aac3a3d703d7cc59f145f13ea779/src/ajax.js) from jQuery's source:

```javascript
executeOnly = ( structure === prefilters );
if ( typeof selection === "string" ) {
} else if ( params && typeof params === "object" ) {
```

The strict equality operator is used almost everywhere, apart from here:

```javascript
if ( s.crossDomain == null ) {
```

In this case, both `undefined` and `null` will be equal, which is a case where `==` is often used in preference to the strict equivalent:

```javascript
if ( s.crossDomain === null || s.crossDomain === undefined ) {
```

## Assertions

One place where the difference between equality and strict equality becomes apparent is in JavaScript unit tests. Most assertion libraries include a way to check 'shallow' equality and 'deep equality'. In [CommonJS Unit Testing](http://wiki.commonjs.org/wiki/Unit_Testing/1.0), these are known as `assert.equal` and `assert.deepEqual`.

In the case of `deepEqual`, there's specific handling for dates and arrays:

> equivalence is determined by having the same number of owned properties (as verified with `Object.prototype.hasOwnProperty.call`), the same set of keys (although not necessarily the same order), equivalent values for every corresponding key, and an identical "prototype" property

## Conclusion

To understand how equality and strict equality work in JavaScript, [primitive values](http://es5.github.io/#x4.3.2) and JavaScript's implicit type conversion behaviour must be understood. In general, experienced developers advocate using `===`, and this is good practice for beginners.

In recognising the confusion surrounding these operators, there is a significant amount of documentation on the topic. For example, [Comparison Operators](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Comparison_Operators) in Mozilla's JavaScript Reference.
