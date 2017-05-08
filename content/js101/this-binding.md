# Call, Apply and Bind

------

> 原文链接：http://dailyjs.com/post/js101-this-binding

Last week we looked at `this`, and how it can be assigned and manipulated. The example I gave showed that a function inside another function (or method) will resolve `this` to the global object, and I used `var self = this` to reference the intended object.

Reader n1k0 pointed out another solution: `Function.prototype.call`:

```javascript
Shape.prototype = {
  move: function(x, y) {
    this.x += x;
    this.y += y;

    function checkBounds() {
      if (this.x > 100) {
        console.error('Warning: Shape out of bounds');
      }
    }

    checkBounds.call(this);
  }
};
```

## The call and apply Methods

In [JS101: Object.create](object.create.html), I mentioned how `Function.prototype.call` can be used to chain constructors. Let's take a deeper look at these methods of `Function`.

The difference between the two is we generally use `call` when we know what a function's arguments are, because they're supplied as arguments. Conversely, `apply` expects an array of parameters:

```javascript
Shape.prototype = {
  move: function(x, y) {
    this.x += x;
    this.y += y;

    function checkBounds(min, max) {
      if (this.x < min || this.x > max) {
        console.error('Warning: Shape out of bounds');
      }
    }

    checkBounds.call(this, 0, 100);
    checkBounds.apply(this, [0, 100]);
  }
};
```

These methods have been around since ECMAScript 3rd Edition, and you'll see them used a lot. Take a look at the source for any popular JavaScript project and you'll find one of these methods being used:

- [jQuery: core.js](https://github.com/jquery/jquery/blob/master/src/core.js)
- [Express: application.js](https://github.com/visionmedia/express/blob/master/lib/application.js)
- [Backbone.js](https://github.com/documentcloud/backbone/blob/master/backbone.js)

Why are these methods so popular? Basically it comes down to functions being a first class citizen in JavaScript. I've been talking about the importance of objects for weeks, but learning how to manipulate functions is the key to mastering JavaScript.

JavaScript allows us to pass functions around, then execute them in different contexts by taking advantage of `call` and `apply`.

This is an example from the beginning of [jQuery's documentation](http://api.jquery.com/jQuery/):

```javascript
$('div.foo').click(function() {
  $(this).slideUp();
});
```

Here, `this` refers to the relevant DOM object. We've supplied our own callback, but `this` points to something that makes sense within the context of jQuery's API.

## Binding

In the comments for the previous post, Andres Descalzo pointed out that [Function.prototype.bind](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind) can also be used to change `this`. The `bind` method of `Function` was introduced in ECMAScript 5th Edition, and it returns a new function that's *bound* to a different `this`:

```javascript
Shape.prototype = {
  move: function(x, y) {
    this.x += x;
    this.y += y;

    function checkBounds(min, max) {
      if (this.x < min || this.x > max) {
        console.error('Warning: Shape out of bounds');
      }
    }

    var checkBoundsThis = checkBounds.bind(this);
    checkBoundsThis(0, 100);
  }
};
```

Notice that a new variable has to be created for the newly bound function. The comment Andres posted uses an anonymous function to remove the extra variable:

```javascript
Shape.prototype = {
  move: function(x, y) {
    this.x += x;
    this.y += y;

    var checkBounds = function(min, max) {
      if (this.x < min || this.x > max) {
        console.error('Warning: Shape out of bounds');
      }
    }.bind(this);

    checkBounds(0, 100);
  }
};
```

I like [Mozilla's bind documentation](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind), because it shows how some built-in methods like `setTimeout` require less syntax when used with methods. The lesson here isn't really due to the design of `setTimeout` but more general: using `bind` is a convenient way to pass a *method* to another function.

## Summary

When working with methods, the value of `this` is important. By using the `apply`, `call` and `bind` methods of `Function`, we can:

- Change `this` inside a function, enabling flexible APIs to be created as demonstrated by popular projects like jQuery, Backbone.js, and Express
- Reduce syntactical overhead when using functions inside methods, and passing methods to other functions
-Chain calls to constructors (see [JS101: Object.create](object.create.html))
