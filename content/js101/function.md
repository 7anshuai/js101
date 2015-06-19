# Function

------

We've already been using functions and methods (remember the difference?) as part of this series, but it's time to take a deeper look at one of my favourite parts of the language. Prepare to have your mind blown by two incredible facts about the humble function.

## Functions are Objects
The [ECMAScript Language Specification](http://ecma-international.org/ecma-262/5.1/) defines three ways to create functions. The first is a function declaration:

```javascript
function sum(a, b) {
  return a + b;
}
```

A `Function` object will be instantiated behind the scenes, and returned as the result of this expression. With that in mind, the following should make complete sense:

```javascript
var sum = function(a, b) {
  return a + b;
};
```

The function expression results in a value being returned, and it can be assigned as required. That's because the function's *identifier* is optional, and also because a `Function` object is returned.

The `Function` constructor isn't hidden away by the interpreter, however. It can be used like this:

```javascript
var sum = new Function('a', 'b', 'return a + b');
```

That brings us to an important point: *functions are objects*. They're not a pre-OO construct that's used to somehow build JavaScript's object-oriented features -- they're actually objects themselves and can be manipulated as such.

When functions are passed as arguments or set to variables, they're colloquially known as *anonymous functions*. This term isn't used within the ECMAScript specification, but you'll see it referred to when people discuss popular APIs like jQuery:

```javascript
$('selector').each(function() {
  // Inside the anonymous function passed to jQuery's `each` method
});
```

## Closures
Functions can be created anywhere an expression can appear, which means they can appear inside other functions:

```javascript
function sum(a, b) {
  function max() {
    return a > 100 || b > 100;
  }

  if (max()) {
    throw new ArgumentError('Value too large');
  }
  return a + b;
}
```

We've already used this when creating "private" functions inside prototype methods and constructors. However, notice how the arguments to `sum` are visible inside the `max` function. Internally, the function is passed the [VariableEnvironment](http://ecma-international.org/ecma-262/5.1/#sec-10.3) of the current context, which is otherwise known as the *scope*.

The fact these inner functions receive access to the variables in their containing function's scope is useful, and known as a [closure](http://ecma-international.org/ecma-262/5.1/#sec-13):

> Let closure be the result of creating a new `Function` object as specified in 13.2 with parameters specified by FormalParameterListopt and body specified by FunctionBody. Pass in funcEnv as the Scope.

References
- [Standard ECMA-262 5.1 Edition](http://ecma-international.org/ecma-262/5.1/)
