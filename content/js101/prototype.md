# 原型

- pubdate: 2016-10-01

------

当经过多年的学习面向对象编程之后，适应 JavaScript 可能会令人沮丧。特别是缺乏一个 `class` 关键词，引起混乱的一个原因。然而，JavaScript 的设计不一定是一个障碍 - 掌握其基于原型的继承会提高你对这门语言的理解。
[//]: <> (After spending years studying object oriented programming, adapting to JavaScript can be frustrating. In particular, the lack of a `class` keyword is a source of confusion. However, JavaScript's design needn't be a hindrance -- mastering its prototype-based inheritance will improve your understanding of the language.)

首先需要明白的一件事情是面向*对象*与面向*类*编程之间的区别。JavaScript 给了我们需要做的大部分基于类的语言可以做到的事情的工具 － 我们只需要学习如何正确使用它。
[//]: <> (The first thing to realise is there should be a distinction between *object*-oriented programming and *class*-oriented. JavaScript gives us the tools we need to do most of the things languages with classes can do -- we just need to learn how to use it properly.)

让我们来简单的介绍一下原型属性，来看看它是如何可以加深我们的 JavaScript 的知识。
[//]: <> (Let's take a brief look at the prototype property to see how it can deepen our knowledge of JavaScript.)

## 原型属性

原型属性是一个内部属性，它被设计用来实现继承。这里所说的“继承”的意思是继承的一种具体形式。因为状态和方法都由对象保存，那么我们可以说结构，行为和状态都被继承（[ES5: Objects](http://es5.github.com/#x4.2.1)）。而基于类的语言，状态是由实例保存，方法是由类保存。
[//]: <> (The prototype property is an internal property, and it's designed to be used to implement inheritance. What we mean by "inheritance" here is a specific form of inheritance. Because both state and methods are carried by objects, then we can say that structure, behaviour, and state are all inherited ([ES5: Objects](http://es5.github.com/#x4.2.1)). This is in contrast to class-based languages, where state is carried by instances and methods are carried by classes.)

构造函数是拥有名为 `prototype` 属性的函数：
[//]: <> (A constructor is a function that has a property named `prototype`:)

```javascript
function Animal() {
}

console.log(Animal.prototype);
```

这将显示 `{}` -- `Animal` 对象拥有一个 `prototype` 属性，但它还没有任何用户定义的东西在里面。我们可以随意添加想要的值和方法：
[//]: <> (This displays `{}` -- the `Animal` object has a `prototype` property, but there's nothing user-defined in it yet. We're free to add values and methods as we please:)

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

这将显示“Dog, 28kg”。我们可以将这些赋值语句通过对象字面量组合在一起：
[//]: <> (This would display "Dog, 28kg". We can group these assignments together by using an object literal:)

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

相比于你可能熟悉的类，这看起来也不会太不一样。
[//]: <> (This shouldn't look too different from the classes you might be more familiar with.)

## 动态原型

属性可以动态的添加到对象中，简单的赋值即可：
[//]: <> (Properties can be added to objects dynamically, simply by assigning values:)

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

在这里添加 `name` 属性只会影响该实例。然而，构造函数的原型可以改变，它会影响到所有通过原型制造的对象：
[//]: <> (Adding the `name` property here only affects that instance. However, the constructor's prototype can be changed, and this will affect objects made with that prototype:)

```javascript
Animal.prototype.weightUnits = 'oz';

console.log(molly.toString())
// Now displays 'Dog, 28oz'
```

这就是为什么人们会夸耀自己的库没有修改原生原型，或仅做安全的改动 －－ 因为完全有可能改变像 `String` 这样的对象预期的内置功能而产生问题：
[//]: <> (This is why people boast that their libraries don't touch native prototypes, or only do so safely -- it's entirely possible to change the expected built-in functionality of objects like `String` to do unsafe things:)

```javascript
String.prototype.match = function() {
  return true;
};

console.log('alex'.match(/1234/));
```

这将返回 `true`，所以现在我已经成功的破坏了一个很多 JavaScript 程序依赖的基础方法。
[//]: <> (This returns `true`, so I've now succeeded in breaking a fundamental method that many JavaScript programs rely on.)
修改原生的原型并不总是坏事；可以利用它做有用的事情，例如给旧的浏览器打补丁以支持更现代版本的 ECMAScript。
[//]: <> (Modifying native prototypes isn't always bad; people use it for useful things like patching support for more modern versions of ECMAScript in older browsers.)

如果我们更换 `prototype` 属性会发生什么？
[//]: <> (What happens if we replace the `prototype` property?)

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

尽管改变原型会影响所有实例，但替换一个构造函数的原型完全不影响旧的实例。为什么？好吧，实例拥有一个原型的*引用*，而不是一个个分散的拷贝。想象它是这样的，每一个由 `new` 关键词创建的实例都*连接*到构造函数的原型。
[//]: <> (Despite the fact changing a prototype affects all of the instances, replacing a constructor's prototype entirely does not affect older instances. Why? Well, instances have a *reference* to the prototype rather than a discrete copy. Think of it like this: each instance created by the `new` keyword is *connected* to the original prototype.)
