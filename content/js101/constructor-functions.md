# Constructor Functions

------

The [ECMAScript 5.1](http://www.ecma-international.org/publications/standards/Ecma-262.htm) specification defines the behaviour of calling "built-in" constructors as if they were functions. That means not only can `new Array(1, 2)` be used, but also `Array(1, 2)`:

> When `Array` is called as a function rather than as a constructor, it creates and initialises a new Array object. Thus the function call `Array(...)` is equivalent to the object creation expression new `Array(...)` with the same arguments.

-- [15.4.1 The Array Constructor Called as a Function](http://es5.github.io/#x15.4.1)

`Object()` is documented as performing a *type conversion*, and `String()` also does this:

```javascript
var a = new String(1);
// { '0': '1' }
var b = String(1);
// '1'
```

The `Date` constructor technically performs a type conversion, but this is sometimes a source of confusion for beginners who just want a readable string representation of a date:

```javascript
var a = new Date(2012, 0, 1);
// Sun, 01 Jan 2012 00:00:00 GMT
Date(2012, 0, 1)
// 'Sun Jun 10 2012 11:28:03 GMT+0100 (BST)'
```

In the first case, a `Date` object is returned, in the second a primitive string value is returned instead.

## Returning Objects from Constructors

In section [13.2.2](http://es5.github.io/#x13.2.2), the behaviour of returning objects from constructors is defined:

> If Type(result) is Object then return result.

This prevents the constructor from returning an instance, so another object can be returned instead.

```javascript
function Shape() {
  return {
    x: 1, y: 1
  };
}

Shape.prototype = {
  move: function() {}
};

var shape = new Shape();
shape.move();
// TypeError: Object #<Object> has no method 'move'
```

It's possible to use `instanceof` to determine if the constructor has been called as a function:

```javascript
function Shape() {
  if (this instanceof Shape) {
    // An object is being instantiated
  } else {
    return {
      a: 'b'
    };
  }
}

Shape.prototype = {
  move: function() {}
};

var shape = new Shape();
shape.move();

Shape(); // Returns { a: 'b' }
```

jQuery uses a similar approach to instantiate `jQuery.Event` objects without requiring the `new` keyword:

```javascript
jQuery.Event = function( src, props ) {
  // Allow instantiation without the 'new' keyword
  if ( !(this instanceof jQuery.Event) ) {
    return new jQuery.Event( src, props );
  }
```

This factory-style behaviour may suit certain APIs -- Dojo also uses it in `NodeList`.

## Conclusion

Calling built-in constructors as functions is used for type conversion, but some constructors behave as if the `new` keyword had been used. To avoid bugs caused by missing `new` keywords, try to remember that these forms are not equivalent.

When writing constructors, this behaviour can be exploited to create factory-like APIs. That's because it's possible to detect when a constructor has been called as a function.

To read more about this topic, searching the ECMAScript specification for "called as a function" is a good starting point.
