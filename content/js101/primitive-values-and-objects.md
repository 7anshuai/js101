# 原始值和对象

- pubdate: 2016-05-18
- issue: 2

------

> 原文链接：http://dailyjs.com/post/js101-object

## 回到基础

当人们与我谈起 DailyJS 时，常会要求更多的初学者文章。因此，我们在 DailyJS 开始 __JS101__ 系列文章。这些文章主要是关于语言基本主题的简短介绍，通常是大概10分钟的篇幅。

我深信学习 JavaScript 归结于理解 `Object`，所以从哪部分开始最好？

## 值的类型

在 JavaScript 中，谦逊的 `Object` 是许多语言特性的基础。要理解 JavaScript 对象，让我们考虑下我们所拥有的值有什么类型。看看下面的例子：

```javascript
var one = 1
  , oneObject = new Number(1);

log(one === oneObject);
log(typeof(one), typeof(oneObject));
```

我制作了这个例子的交互版，你可以在这里实验：http://jsfiddle.net/uWup3/ 。

这里使用了 _严格比较操作符_ 来比较值 `1` 与对象 `new Number(1)`，返回值是 `false`。原因是 `1` 是一个 [原始值](http://es5.github.io/#x4.3.2)，而不是一个对象。由 `new Number` 创建的数字是一个对象，如同 `typeof` 返回的值。

原始值的类型有：未定义，空，布尔，数字和字符串。关于未定义与空类型有趣的一点是它们是有且只有唯一的值，分别为 `undefined` 和 `null`。

## 创建对象

当我们使用 JavaScript 时，主要会关注对象。这也是为什么 JSON 会如此流行和强大的原因之一，源自于对象的灵活性。对象和原始值的主要差别是对象明确的由多个项组成：

```javascript
var javascript = {  
  influences: ['C', 'Java', 'Scheme']
, designer: 'Brendan Eich'
, created: new Date(1995, 0, 1)
};
```

在这个对象中的项 -- `influences`，`designer` 和 `created` -- 被称为 _属性_。很难想象如何将 `10` 或者 `true` 分解为它们的组成部分，但是这个对象可以轻松做到。注意每个值都可以是不同的类型 -- 无论原始值还是对象都可以组合到一个对象中。

研究一下这个：

```javascript
var javascript = new Object({  
  influences: ['C', 'Java', 'Scheme']
, designer: 'Brendan Eich'
, created: new Date(1995, 0, 1)
});
```

我使用 `new Object` 创建了一个新实例。根据语言规范，[对象初始化器]章节中，两种形式是等价的 － 使用对象字面量创建对象如同 `new Object()` 一样返回一个新对象。同样，数组字面量 `['C', 'Java', 'Scheme']` 会如同 `new Array()` 一样创建一个数组对象。

需要注意的一个重要事情是构造函数的用法。上面的例子中是 `new Object`，但还有其他内置构造函数。我也会使用 `new Date` 创建一个 `Date` 对象。

## 构造函数

前面的例子看起来更像是一个数据记录。我们可以增加可重用性，通过创建一个_构造函数_ -- 一个知道如何初始化特定对象的函数。

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

现在我可以创建其他的编程语言：

```javascript
var c = new Language(  
  'Dennis Ritchie'
, new Date(1972, 0, 1)
, ['B', 'ALGOL']
);
```

对象的构造函数可以通过访问 `constructor` 属性获得，像这样：`c.constructor`。在上面的例子中会返回 `Language`。在这里实验它：http://jsfiddle.net/zYzER/6/ 。

在 ES5 规范[Object 原型对象的属性](http://es5.github.com/#x15.2.4)章节中，提到了其他的对象属性。例如，我们也有 `toString`，还有一些像 `hasOwnProperty` 这样听起来陌生的方法。
