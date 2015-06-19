# Object.create

------

The inheritance examples we looked at last week used the form `Rectangle.prototype = new Shape()`. The reason I like this example is it shows how powerful prototypes are, despite their simplicity. The downside is the constructor for the parent object is executed, which isn't always what's desired.

ECMAScript 5 introduced `Object.create`, which creates new objects based on a prototype object and an additional set of properties.

The main differences between `B.prototype = new A()`; and `B.prototype = Object.create(A.prototype)` are as follows:

The constructor, `A` isn't called, so `B` remains uninitialised until instantiated
`Object.create` accepts a second argument that causes `Object.create` to behave as if `Object.defineProperties` was called

## Using `Object.create`
Last week's `Shape` example could be rewritten to use `Object.create`:

```javascript
function Shape() {
  this.x = 0;
  this.y = 0;
  console.log('Shape constructor called');
}

Shape.prototype = {
  move: function(x, y) {
    this.x += x;
    this.y += y;
  }
};

// Rectangle
function Rectangle() {
  console.log('Rectangle constructor called');
  this.x = 0;
  this.y = 0;
}

Rectangle.prototype = Object.create(Shape);
```

Now rectangles can be created with `var rect = new Rectangle()` and the original `Shape` constructor won't be called. This leaves us with a cleaner prototype chain, but what if we still want to call the previous constructor? In this particular example, calling the `Shape` constructor is desirable because we'll avoid duplicating some initialisation code.

## Calling Constructors
By using the `Function.prototype.call` or `apply` methods, it's entirely possible to call another constructor even when using `Object.create`. For example:

```javascript
function Shape() {
  this.x = 0;
  this.y = 0;
  console.log('Shape constructor called');
}

Shape.prototype = {
  move: function(x, y) {
    this.x += x;
    this.y += y;
  }
};

// Rectangle
function Rectangle() {
  console.log('Rectangle constructor called');
  Shape.call(this);
}

Rectangle.prototype = Object.create(Shape.prototype);
```

The fact `call` and `apply` take a `this` parameter (known as *ThisBinding* in the ECMAScript specification) allows us to reuse constructors where required.

## No Inheritance: Object.create(null)
By passing `null` to `Object.create`, objects can be created that don't inherit from anything. By default `Object.prototype` is used, which has several [built-in methods](http://es5.github.io/#x15.2.4). What if we don't want to inherit from `Object.prototype`?

```javascript
function Shape() {
}

Shape.prototype = Object.create(null);

var shape = new Shape();
console.log(shape.toString);
```

In this example, `undefined` will be printed -- objects created using the `Shape` constructor inherit from `null`.

Notice that this is not equivalent:

```javascript
function Shape() {
}

Shape.prototype = null;

var shape = new Shape();
console.log(shape.toString);
```

This should print something like `[Function: toString]` rather than `undefined`.

It's interesting to think about exactly why this is useful. In [An Object is not a Hash](http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/), Guillermo Rauch discusses how the properties of `Object.prototype` can be used to potentially cause security issues, and `Object.create(null)` was suggested as a suitable means for creating a "clean" object to avoid the problem.

Another point is performance. These [Object.create(null) benchmarks](http://jsperf.com/object-create-null-iteration/2) demonstrate iterating over various objects, and the `Object.create(null)` tests run faster than object literals.

However, be very careful when using this approach because so many libraries expect objects to have the standard methods.

## The Second Argument to `Object.create`

According to the [Annotated ECMAScript 5 Object.create documentation](http://es5.github.io/#x15.2.3.5), passing a second argument behaves as if `Object.defineProperties` had been called. This method requires a bit of knowledge before it can be used -- the properties have to be passed in the expected format.

In this example, `Rectangle` inherits from `Shape` and gets a property called `animate` at the same time:

```javascript
Rectangle.prototype = Object.create(Rectangle.prototype, {
  animate: {
    value: function() {
      this.animating = true;
    }
  }
});

var rect = new Rectangle();
```

Now `rect.animate()` can be called, just like any other method. Notice that the second argument is in the form `{ propertyName: { value: function() {} } }` -- the `value` property is important and I haven't arbitrarily picked it. These properties are known as [property attributes](http://es5.github.io/#x8.6.1).

Property attributes can be "named data" and "named attribute" properties. These additional flags can be applied to named data properties:

- `writable`: Determines if the property is writable
- `enumerable`: Should this property be included in `for-in` enumeration?
- `configurable`: If `false`, attempts to delete or change the property's attributes will fail

Although this is new to ECMAScript 5, it adds a much desired level of control to properties and their definition.

## Getters and Setters
Property attributes allow JavaScript to support getters and setters with a lightweight syntax:

```javascript
function Rectangle() {
  this._animating = false;
}

Rectangle.prototype = Object.create(Shape.prototype, {
  animating: {
    get: function() {
      console.log('Rectangle.prototype.animating get');
      return this._animating;
    },

    set: function(value) {
      console.log('Rectangle.prototype.animating set');
      this._animating = value;
    }
  }
});

var rect = new Rectangle();

rect.animating = true;
console.log(rect.animating);
```

In this example I've renamed `animating` to `_animating`, but it can still be accessed using `rect.animating` because I've defined an `animating` property with a `get` and `set` method.

This makes it possible to track whenever this value is changed, as illustrated by the `console.log` calls.

In JavaScript implementations that don't include `Object.create`, this second argument may not be supported. The [ECMAScript 5 compatibility table](http://kangax.github.com/es5-compat-table/) by Kangax has a wide range of compatibility tests that can help you decide if it's safe to use it.
