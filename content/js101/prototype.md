# Prototype

------

After spending years studying object oriented programming, adapting to JavaScript can be frustrating. In particular, the lack of a `class` keyword is a source of confusion. However, JavaScript's design needn't be a hindrance -- mastering its prototype-based inheritance will improve your understanding of the language.

The first thing to realise is there should be a distinction between *object*-oriented programming and *class*-oriented. JavaScript gives us the tools we need to do most of the things languages with classes can do -- we just need to learn how to use it properly.

Let's take a brief look at the prototype property to see how it can deepen our knowledge of JavaScript.

## The `prototype` Property

The prototype property is an internal property, and it's designed to be used to implement inheritance. What we mean by "inheritance" here is a specific form of inheritance. Because both state and methods are carried by objects, then we can say that structure, behaviour, and state are all inherited ([ES5: Objects](http://es5.github.com/#x4.2.1)). This is in contrast to class-based languages, where state is carried by instances and methods are carried by classes.

A constructor is a function that has a property named `prototype`:

```javascript
function Animal() {
}

console.log(Animal.prototype);
```

This displays `{}` -- the `Animal` object has a `prototype` property, but there's nothing user-defined in it yet. We're free to add values and methods as we please:

```javascript
function Animal() {
}

Animal.prototype.type = 'Unknown';
Animal.prototype.weight = 0;
Animal.prototype.weightUnits = 'kg';

Animal.prototype.toString = function() {
  return this.type + ', ' + this.weight + this.weightUnits;
};

var molly = new Animal();
molly.type = 'Dog';
molly.weight = 28;

console.log(molly.toString());
```

This would display "Dog, 28kg". We can group these assignments together by using an object literal:

```javascript
function Animal() {
}

Animal.prototype = {
  type: 'Unknown',
  weight: 0,
  weightUnits: 'kg',

  toString: function() {
    return this.type + ', ' + this.weight + this.weightUnits;
  }
};
```

This shouldn't look too different from the classes you might be more familiar with.

## Dynamic Prototypes

Properties can be added to objects dynamically, simply by assigning values:

```javascript
var molly = new Animal()
  , harley = new Animal();

molly.type = 'Dog';
molly.weight = 28;

harley.type = 'Dog';
harley.weight = 38;
harley.name = 'Harley';

console.log(molly);
console.log(harley);

// { type: 'Dog', weight: 28 }
// { type: 'Dog', weight: 38, name: 'Harley' }
```

Adding the `name` property here only affects that instance. However, the constructor's prototype can be changed, and this will affect objects made with that prototype:

```javascript
Animal.prototype.weightUnits = 'oz';

console.log(molly.toString())
// Now displays 'Dog, 28oz'
```

This is why people boast that their libraries don't touch native prototypes, or only do so safely -- it's entirely possible to change the expected built-in functionality of objects like `String` to do unsafe things:

```javascript
String.prototype.match = function() {
  return true;
};

console.log('alex'.match(/1234/));
```

This returns `true`, so I've now succeeded in breaking a fundamental method that many JavaScript programs rely on.

Modifying native prototypes isn't always bad; people use it for useful things like patching support for more modern versions of ECMAScript in older browsers.

What happens if we replace the `prototype` property?

```javascript
var molly = new Animal()
  , harley;

molly.type = 'Dog';
molly.weight = 28;

Animal.prototype = {
  toString: function() {
    return '...';
  }
};

harley = new Animal;
harley.type = 'Dog';
harley.weight = 38;

console.log(molly.toString());
console.log(harley.toString());

// Dog, 28kg
// ...
```

Despite the fact changing a prototype affects all of the instances, replacing a constructor's prototype entirely does not affect older instances. Why? Well, instances have a *reference* to the prototype rather than a discrete copy. Think of it like this: each instance created by the `new` keyword is *connected* to the original prototype.
