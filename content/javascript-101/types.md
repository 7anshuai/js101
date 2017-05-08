# 类型

- pubdate: 2015-03-09
- issue: 1

------

> 原文链接：https://github.com/jquery/learn.jquery.com/tree/v0.6.1/page/javascript-101/types.md

JavaScript 中的数据类型有两类：原始类型和对象。原始类型包括：

* 字符串
* 数字
* 布尔
* null
* undefined

## 字符串

字符串是被单引号或双引号包含的文本。最佳实践是始终保持使用一种引号。有时候字符串里的引号标记会和创建字符串的引号冲突，在这种情况下，可以使用 `\` 反斜线转义字符或者使用不同的引号。

```javascript
// Strings can be created with double or single quotes.
var a = "I am a string";
var b = 'So am I!';
alert( a );
alert( b );
```

```javascript
// Sometimes a string may contain quotation marks.
var statement1 = 'He said "JavaScript is awesome!"';
var statement2 = "He said \"JavaScript is awesome!\"";
```

## 数字

数字是任何正或负的数值。整数和浮点数之间没有区别。

```javascript
// Numbers are any whole or floating point integer.
var num1 = 100;
var num2 = 100.10;
var num3 = 0.10;
```

## 布尔

布尔类型是 `true` 或者 `false`。

```javascript
// Boolean values.
var okay = true;
var fail = false;
```

## null 和 undefined

`null` 和 `undefined` 是 JavaScript 中的特殊类型。 Null 类型表示一个空值，类似于许多其他语言。 Undefined 类型表示变量还没有赋值的状态，可以通过两种方式来创建： 通过使用 `undefined` 关键字或者在定义变量的时候不赋值。

```javascript
// Define a null value.
var foo = null;

// Two ways to achieve an undefined value.
var bar1 = undefined;
var bar2;
```

## 对象

其他一切都是对象。JavaScript 有众多的 [内置对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects "MDN - 内置对象")，但本指南只包括：

* 对象
* 数组
* 函数

最简单的创建对象的方法是被称为对象字面量的简写语法。这些简单的对象是无序的键值对集合。对象中的键通常被称为“属性”，属性的值可以是任何有效的 JavaScript 类型，甚至可以是另一个对象。创建或访问对象的属性，我们可以使用“点号表示法”或者“括号表示法”。

```javascript
// Using an empty object literal
var person1 = {};

// Assign properties using "dot notation"
person1.firstName = "John";
person1.lastName = "Doe";

// Access properties using "dot notation"
alert( person1.firstName + " " + person1.lastName );

// Creating an object with the object literal syntax:
var person2 = {
	firstName: "Jane",
	lastName: "Doe"
};

alert( person2.firstName + " " + person2.lastName );

var people = {};

// Assign properties using "bracket notation"
// As mentioned, objects can also have objects as a property value
people[ "person1" ] = person1;
people[ "person2" ] = person2;

// Access properties using a mix of both bracket and dot notation
alert( people[ "person1" ].firstName );
alert( people[ "person2" ].firstName );
```

如果被访问的属性还未定义，那么它的值将是 `undefined`。

```javascript
// Properties that have not been created are undefined.
var person = { name: "John Doe" };
alert( person.email ); // undefined
```

在 [对象](/javascript-101/objects.html) 部分会进一步讨论 JavaScript 对象。

## 数组

数组是一类由它所包含的每一个项的索引排序的对象。索引开始于零，并扩展到已添加的项的数目，（项的数目）也是被称为 `.length` 的数组属性。类似一个基本对象，数组可以使用 `Array` 构造函数或者被称为数组字面量的简写语法来创建。

```javascript
// Creating an array with the constructor:
var foo = new Array;

// Creating an array with the array literal syntax:
var bar = [];
```

在这两种语法之间有一个重要的区别。数组构造函数和数组字面量都可以在创建时加入要包含到数组的项，但是如果只是传入一个单一的数字项，数组构造函数会将该数字项当作数组的长度值。

```javascript
// The array literal returns a foo.length value of 1:
var foo = [ 100 ];
alert( foo[ 0 ] ); // 100
alert( foo.length ); // 1

// The array constructor returns a bar.length value of 100:
var bar = new Array( 100 );
alert( bar[ 0 ] ); // undefined
alert( bar.length ); // 100
```

数组可以通过已经存在数组实例中的方法来进行相关操作。数组中的项可以通过括号和给定的索引来引用。如果索引不存在或者不包括任何值，则返回值 `undefined`。

一些常见的数组方法如下所示：

```javascript
// Using the push(), pop(), unshift() and shift() methods on an array.

var foo = [];

foo.push( "a" );
foo.push( "b" );

alert( foo[ 0 ] ); // a
alert( foo[ 1 ] ); // b

alert( foo.length ); // 2

foo.pop();

alert( foo[ 0 ] ); // a
alert( foo[ 1 ] ); // undefined

alert( foo.length ); // 1

foo.unshift( "z" );

alert( foo[ 0 ] ); // z
alert( foo[ 1 ] ); // a

alert( foo.length ); // 2

foo.shift();

alert( foo[ 0 ] ); // a
alert( foo[ 1 ] ); // undefined

alert( foo.length ); // 1
```

还有更多的方法来操作数组，一部分将在[数组](/javascript-101/arrays.html) 进一步讨论。更多的详细信息可在 [Mozilla 开发者网络](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array "MDN - 数组参考") 找到。

## jQuery 中的类型检测

jQuery 提供了一些基本的实用方法，用于判断一个特定值的类型。类型检测会在 [类型检测](/javascript-101/testing-type.html)部分进一步的讨论，这里有一些例子：

```javascript
// Checking the type of an arbitrary value.

var myValue = [ 1, 2, 3 ];

// Using JavaScript's typeof operator to test for primitive types:
typeof myValue === "string"; // false
typeof myValue === "number"; // false
typeof myValue === "undefined"; // false
typeof myValue === "boolean"; // false

// Using strict equality operator to check for null:
myValue === null; // false

// Using jQuery's methods to check for non-primitive types:
jQuery.isFunction( myValue ); // false
jQuery.isPlainObject( myValue ); // false
jQuery.isArray( myValue ); // true
```
