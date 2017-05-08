# this

------

> 原文链接：http://dailyjs.com/post/js101-this

So far in JS101, our examples have mentioned `this` and functions that take advantage of its behaviour, like `Function.prototype.apply` and `Function.prototype.call`. However, before approaching other aspects of the language, we should first address this and execution contexts.

## Methods and Functions
In this article I refer to both methods and functions. [Method](http://es5.github.com/#x4.3.27) is defined in the ECMAScript specification as follows:

> ... function that is the value of a property.
> NOTE When a function is called as a method of an object, the object is passed to the function as its this value.

We typically think of functions as a standalone subroutine, while methods are properties of an object that happen to be functions. This nomenclature is used widely within the community.

## Execution Context
According to the ECMAScript 5.1 specification, an executing program is formed of "execution contexts". These execution contexts support the language constructs we need to manage scope -- the visibility of variables and function declarations from other parts of a program.

The execution context contains references to various elements that enable state within a program to be managed according to the current logical scope -- for the exact details, see [Execution Contexts](http://es5.github.com/#x10.3) in the specification. What we're interested in is how the current value of `this` is determined.

## Global Context and Constructors
Try running the following code in Node or a browser:

```javascript
function add(x, y) {
  console.log(this);
  return x + y;
}

add(1, 1);
```

The second line will cause the global context to be displayed: `global` in Node, or `window` in a browser. If I inserted `'use strict'` after the line that reads function add..., then `this` would be `undefined` instead.

Now consider what happens when a constructor is executed:

```javascript
function Shape() {
  this.x = 0;
  this.y = 0;
}

var shape = new Shape();
```

When control enters the `Shape` constructor as a result of `new Shape()`, the this value will refer to the current object. Keep this in mind when writing object-oriented code: if a function is called as a method on an object, or by using `new`, then the value of `this` will be the current instance of the object, otherwise it will be the global context (or `undefined` in strict mode). The lesson here is the value of `this` is dependent on how a function is called.

Common Mistakes
Be careful when nesting functions inside methods. Read the following example and try to figure out the value of `this` inside `checkBounds`:

```javascript
function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype = {
  move: function(x, y) {
    this.x += x;
    this.y += y;

    function checkBounds() {
      if (this.x > 100) {
        console.error('Warning: Shape out of bounds');
      }
    }

    checkBounds();
  }
};

var shape = new Shape();
shape.move(101, 1);
```

The `checkBounds` function is defined inside the `move` method, but the `console.error` line will never be reached. This is because the value of `this` will be set to the global context, which is correct according to the specification but understandably confusing and represents a common source of bugs.

Fortunately, `this` is a value so we can reference it by using another variable:

```javascript
Shape.prototype = {
  move: function(x, y) {
    var self = this;

    this.x += x;
    this.y += y;

    function checkBounds() {
      if (self.x > 100) {
        console.error('Warning: Shape out of bounds');
      }
    }

    checkBounds();
  }
};
```

Here `self` now points to the ThisBinding assigned when `move` executes, so `checkBounds` will work the way we intend it to. The name self can be anything, but it's a popular convention. It's not a [reserved word](https://developer.mozilla.org/en/JavaScript/Reference/Reserved_Words), but your editor may highlight it.

## Summary
When working with `this`, remember the following rules:

It's set based on how a function is called: `new MyConstructor` or `myObject.method()` will refer to an instance, while `this` inside a function refers to the global context
Strict mode causes `this` to evaluate to `undefined` instead of the global context inside functions
`this` can be referenced by a variable, and `self` is the conventionally used name
If you want to read lower-level details on this topic, start by looking at how the ECMAScript 5.1 specification defines the algorithms that are used to determine `this` for various situations: [entering global code](http://es5.github.io/#x10.4.1), [executing `eval` code](http://es5.github.io/#x10.4.2), and [entering functions](http://es5.github.io/#x10.4.3).
