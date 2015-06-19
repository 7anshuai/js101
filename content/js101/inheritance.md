# Inheritance

------

## Inheritance Chains and Constructors

As we saw last week, JavaScript objects have a `prototype` property, which is designed to facilitate inheritance. An object's `prototype` property can be set to an instance of another object to create an inheritance chain:

```javascript
function Shape(name) {
  this.x = 0;
  this.y = 0;
  this.name = name;
  console.log('Shape constructor called');
}

Shape.prototype = {
  move: function(x, y) {
    this.x += x;
    this.y += y;
  },

  toString: function() {
    return 'name: ' + this.name + ', at x: ' + this.x + ', y:' + this.y;
  }
};

// Rectangle
function Rectangle(name) {
  this.name = name;
  console.log('Rectangle constructor called');
}

Rectangle.prototype = new Shape();

var rect = new Rectangle('Player 1');
rect.move(1, 1);
console.log(rect.toString());
console.log(rect instanceof Rectangle);
```

Running this will display the following output:

```javascript
Shape constructor called
Rectangle constructor called
name: Player 1, at x: 1, y:1
true
```

Notice that both the `Shape` and `Rectangle` constructors are called. This is because of the line `Rectangle.prototype = new Shape();` -- the parent object's constructor isn't actually automatically called as a result of `new Rectangle()`. This is why I've duplicated the `this.name = name` line in both constructors.

Also notice that `rect.move` and `rect.toString` call the methods from `Shape.prototype`. When the interpreter checks for a property, it will examine the current object for it. If no such property is found, the prototype for the object is checked, and so on. This is the prototype chain:

> First the object mentioned directly is examined for such a property; if that object contains the named property, that is the property to which the reference refers; if that object does not contain the named property, the prototype for that object is examined next; and so on.

-- [Annotated ECMAScript 5.1](http://es5.github.io/#x4.2.1)

## Calling Parent Methods

If we wanted `Rectangle` to have a different `move` method, but reuse the original in `Shape`, then it's entirely possible to do so using `Function.prototype.apply`:

```javascript
Rectangle.prototype.move = function(x, y) {
  console.log('Super method called');
  Shape.prototype.move.apply(this, arguments);
};
```

Even though `Shape.prototype.move.apply` looks complicated, it's actually very simple if we break it down:

1. We want to call the `move` method from `Shape`
2. This method is stored in `Shape.prototype.move`
3. Since this is a `Function`, there are several methods available to us (functions are objects!)
4. The [apply](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/apply) method in particular allows us to call the function without creating a new instance
5. It also allows us to provide our own value for `this`, and an array of arguments

The [arguments](http://es5.github.io/#x10.6) object is created by the interpreter when a function is executed. The `this` object is a whole other story -- so far I've been assuming you have intuitively understood what it is, but we'll look at it in more detail in the next part.

References
- [Annotated ECMAScript 5.1](es5.github.io)
- [MDN documentation for apply](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/apply)
