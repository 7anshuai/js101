# 继承
[//]: <> (# Inheritance)

- pubdate: 2016-10-05
- issue: 2

------

## 继承链和构造函数
[//]: <> (## Inheritance Chains and Constructors)

如之前所见，JavaScript 对象拥有一个 `prototype` 属性，它被设计用来实现继承。一个对象的 `prototype` 属性可以被设置为另一个对象的实例，以此创建一个继承链：
[//]: <> (As we saw last week, JavaScript objects have a `prototype` property, which is designed to facilitate inheritance. An object's `prototype` property can be set to an instance of another object to create an inheritance chain:)

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

运行会显示下面的输出：
[//]: <> (Running this will display the following output:)

```javascript
Shape constructor called
Rectangle constructor called
name: Player 1, at x: 1, y:1
true
```

注意无论 `Shape` 还是 `Rectangle` 构造函数都被调用了。这是因为这一行 `Rectangle.prototype = new Shape();`。
[//]: <> (Notice that both the `Shape` and `Rectangle` constructors are called. This is because of the line `Rectangle.prototype = new Shape();` -- the parent object's constructor isn't actually automatically called as a result of `new Rectangle()`. This is why I've duplicated the `this.name = name` line in both constructors.)

另外需要注意到 `rect.move` 和 `rect.toString` 会从 `Shape.prototype` 中调用方法。当解释器检查一个属性，首先会在当前对象中查找。如果没有找到属性，则会在对象的原型中查找，并以此类推。这就是原型链：
[//]: <> (Also notice that `rect.move` and `rect.toString` call the methods from `Shape.prototype`. When the interpreter checks for a property, it will examine the current object for it. If no such property is found, the prototype for the object is checked, and so on. This is the prototype chain:)

> 首先在被涉及的对象中直接查找属性，如果对象包含该命名属性，则引用此命名属性；如果对象不包含该命名属性，对象的原型会被检查；以此类推。
[//]: <> (> First the object mentioned directly is examined for such a property; if that object contains the named property, that is the property to which the reference refers; if that object does not contain the named property, the prototype for that object is examined next; and so on.)

-- [Annotated ECMAScript 5.1](http://es5.github.io/#x4.2.1)

## 调用父级方法
[//]: <> (## Calling Parent Methods)

如果 `Rectangle` 想要一个不同的 `move` 方法，但想重用 `Shape` 中初始的方法，那么完全可以使用 `Function.prototype.apply` 来实现：
[//]: <> (If we wanted `Rectangle` to have a different `move` method, but reuse the original in `Shape`, then it's entirely possible to do so using `Function.prototype.apply`:)

```javascript
Rectangle.prototype.move = function(x, y) {
  console.log('Super method called');
  Shape.prototype.move.apply(this, arguments);
};
```

尽管 `Shape.prototype.move.apply` 看起来很复杂，但如果我们把它分解，实际上很简单：
[//]: <> (Even though `Shape.prototype.move.apply` looks complicated, it's actually very simple if we break it down:)

1. 我们想要调用来自 `Shape` 的 `move` 方法
2. 此方法保存在 `Shape.prototype.move`
3. 因为它是一个 `Function`，所以有一些我们可用的方法（函数是对象！）
4. [apply](https://developer.mozilla.org/zh-CN/JavaScript/Reference/Global_Objects/Function/apply) 特别的允许我们调用函数，而无需创建一个新实例
5. 它还允许我们提供一个 `this` 值，以及一个参数数组

[//]: <> (1. We want to call the `move` method from `Shape`)
[//]: <> (2. This method is stored in `Shape.prototype.move`)
[//]: <> (3. Since this is a `Function`, there are several methods available to us (functions are objects!))
[//]: <> (4. The [apply](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/apply) method in particular allows us to call the function without creating a new instance)
[//]: <> (5. It also allows us to provide our own value for `this`, and an array of arguments))

当一个函数执行时，[参数](http://es5.github.io/#x10.6)对象由解释器创建。`this` 对象是另外一个故事了 －－ 到目前为止我假设你已经直观的理解它是什么了，但我们会在接下来的部分更详细的看看它。
[//]: <> (The [arguments](http://es5.github.io/#x10.6) object is created by the interpreter when a function is executed. The `this` object is a whole other story -- so far I've been assuming you have intuitively understood what it is, but we'll look at it in more detail in the next part.)

引用
[//]: <> (References)
- [Annotated ECMAScript 5.1](http://es5.github.io)
- [MDN documentation for apply](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/apply)
