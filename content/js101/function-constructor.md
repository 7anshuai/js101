# The Function Constructor

------

Last week we took a cursory glance at functions, and this week we'll look at the `Function` object itself.

## Creating Functions with the `Function` Constructor
Functions can be instantiated with zero or more arguments. The last argument is always the function body:

```javascript
var sum = new Function('a', 'b', 'return a + b');
sum(1, 1);
// 2
```

The `length` property will return the number of arguments:

```javascript
sum.length
// 2
```

This property is not writeable. The function body will have access to `arguments`, so supporting [variable arguments is still possible](http://es5.github.io/#x15.3.5.1):

> The behaviour of a function when invoked on a number of arguments other than the number specified by its length property depends on the function.

Other properties include [call, apply, and bind](this-binding.html). There's also a `toString` method, which will return a string containing the function's body. It won't be exactly the same as the source supplied to the `Function` constructor.

## Scope
To all intents and purposes, functions created this way are indistinguishable from any other function. There is a difference, however, and that lies in the scope binding. The [Global Environment](http://es5.github.io/#x10.2.3) is passed as the scope for the new function, which isn't necessarily intuitive. This isn't a bug and is covered by the specification, but it's worth being aware of the behaviour.

For example, this will fail because `a` isn't in scope for the `Function` instances:

```javascript
function container() {
  var a = 1
    , b = 1
    , sum = new Function('return a + b')
    , sum2 = new Function('sum()');
  sum();
  sum2();
}

container();
```

The amazing thing is, an `eval` would have access to `a` and `b` because [entering eval code](http://es5.github.io/#x10.4.2) sets up the lexical and variable environments the usual way.

This difference is useful, because `new Function` offers a way to execute arbitrary code without providing access to local (perhaps considered "internal") variables. jQuery's JSON parser uses this distinction to [parse JSON](https://github.com/jquery/jquery/blob/f5fd41252e3ae48a655c5da4a0b2910bb897b6ed/src/core.js#L501):

```javascript
if (rvalidchars.test( data.replace( rvalidescape, "" )
    .replace( rvalidtokens, "]" )
    .replace( rvalidbraces, "")) ) {

  return ( new Function( "return " + data ) )();
}
```

In this way we can see `eval` and `new Function` are related, but not entirely the same. However, some well-known JavaScript professionals [strongly warn against using both](http://javascript.crockford.com/code.html):

> `eval` has aliases. Do not use the `Function` constructor. Do not pass strings to `setTimeout` or `setInterval`.

## Metaprogramming

The `Function` constructor is occasionally used for [metaprogramming](http://en.wikipedia.org/wiki/Metaprogramming). It's used to generate new methods in the [Mongoose MongoDB module for Node](https://github.com/LearnBoost/mongoose/blob/35d8eea943ef8f3ca8706ad39ab6ea2e74a166d0/lib/types/buffer.js#L147-151):

```javascript
MongooseBuffer.prototype[method] = new Function(
  'var ret = Buffer.prototype.'+method+'.apply(this, arguments);' +
  'this._markModified();' +
  'return ret;'
)
```

In this case, it would be trivial to refactor out the `Function` constructor.

There are more specific cases where the `Function` constructor is used for more devious metaprogramming. The Jade template language [compiles templates into functions](https://github.com/visionmedia/jade/blob/e805f6a2d5eb80c680e7bbddd3ea4390b2808c2e/lib/jade.js#L143-160). Dojo also has a few places relating to templates where it's used as well.

## Conclusion

The `Function` constructor has some scope behaviour that takes a bit of getting used to, but it's exploited by a very specific class of libraries. In general, most code doesn't really need to use `new Function`.

## References
- [Annotated ES5](http://es5.github.io/)
- [jQuery's source](https://github.com/jquery/jquery/)
- [Mongoose's source](https://github.com/LearnBoost/mongoose)
- [Jade's source](https://github.com/visionmedia/jade)
