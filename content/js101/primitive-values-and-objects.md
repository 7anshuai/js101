# Primitive values and objects

------

## Back to Basics

When people talk to me about DailyJS they often ask for more beginner's articles. Therefore, we're starting the __JS101__ series on DailyJS. These are intended to be short guides on fundamental topics that shouldn't take more than about 10 minutes to read.

I really believe learning JavaScript comes down to understanding `Object`, so what better place to start?

## Types of Values

In JavaScript, the humble `Object` underlies many of the language's strengths. To understand JavaScript objects, let's consider what types of values we have at our disposal. Take a look at the following example:

```javascript
var one = 1
  , oneObject = new Number(1);

log(one === oneObject);
log(typeof(one), typeof(oneObject));
```

I've made an interactive version of this example that you can experiment with here: http://jsfiddle.net/uWup3/.

This uses the _strict equals operator_ to compare the value `1` with the object `new Number(1)`, and `false` is returned. The reason for this is `1` is a [primitive value](http://es5.github.io/#x4.3.2), and is not an object. The number created with `new Number` is an object, as shown by the value returned by `typeof`.

There are other primitive values: Undefined, Null, Boolean, Number, and String. Another interesting point relates to `Undefined` and how it's a type whose sole value is `undefined`.

## Creating Objects

When working in JavaScript, we mostly concern ourselves with objects. There's a reason why JSON is so popular and powerful, and it comes down to the flexibility of objects. The main difference between objects and primitive values is objects are clearly comprised of multiple items:

```javascript
var javascript = {  
  influences: ['C', 'Java', 'Scheme']
, designer: 'Brendan Eich'
, created: new Date(1995, 0, 1)
};
```

The 'items' in this object -- `influences`, `designer`, and `created` -- are known as _properties_. While it's difficult to imagine breaking down `10` or `true` into their constituent parts, this object can easily be broken down. Notice how each value can be a different type -- both primitive values and objects can be combined together in an object.

Now consider this:

```javascript
var javascript = new Object({  
  influences: ['C', 'Java', 'Scheme']
, designer: 'Brendan Eich'
, created: new Date(1995, 0, 1)
});
```

I've used new Object to create a new instance. According to the language specification, under [Object Initialiser](http://es5.github.io/#x11.1.5), these forms are equivalent -- creating objects with an object literal will return a new object as if `new Object()` was used. Similarly, the array literal `['C', 'Java', 'Scheme']` will create a new object as if `new Array()` had been called.

The important thing to notice is the use of a constructor. In this case the constructor is `new Object`, but there are other built-in constructors. I also sneaked in `new Date` which creates a `Date` object.

## Constructors

The previous example looks more like a data record than a reusable piece of code. We can make it more reusable by creating a _constructor_ -- a function that knows how to initialise a certain flavour of object.

```javascript
function Language(designer, created, influences) {  
  this.designer = designer;
  this.created = created;
  this.influences = influences;
}

var javascript = new Language(  
  'Brendan Eich'
, new Date(1995, 0, 1)
, ['C', 'Java', 'Scheme']
);
```

Now I can make other programming languages:

```javascript
var c = new Language(  
  'Dennis Ritchie'
, new Date(1972, 0, 1)
, ['B', 'ALGOL']
);
```

The constructor can be accessed using the `constructor` property, like this: `c.constructor`. In this case it'll return `Language`. Play around with it here: http://jsfiddle.net/zYzER/6/.

In the ES5 specification under [Properties of the Object Prototype Object](http://es5.github.com/#x15.2.4), other properties of objects are mentioned. For example, we also get `toString`, and some stranger sounding methods like `hasOwnProperty`.
