# 运算符

- pubdate: 2015-03-13

-------

基本的运算符让你可以操作值。

```
// Concatenation
var foo = "hello";
var bar = "world";

console.log( foo + " " + bar ); // "hello world"
```

```
// Multiplication and division
2 * 3;
2 / 3;
```

```
// Incrementing and decrementing
// The pre-increment operator increments the operand before any further processing.
var i = 1;
console.log( ++i ); // 2 - because i was incremented before evaluation
console.log( i );   // 2

// The post-increment operator increments the operand after processing it.
var i = 1;
console.log( i++ ); // 1 - because i was evaluated to 1 and _then_ incremented
console.log( i );   // 2 - incremented after using it
```

## 数字和字符串操作

在 JavaScript 中，数字和字符串偶尔会表现的出人意料。

```
// Addition vs. Concatenation
var foo = 1;
var bar = "2";

console.log( foo + bar ); // "12"
```

```
// Coercing a string to act as a number.
var foo = 1;
var bar = "2";

console.log( foo + Number(bar) ); // 3
```

`Number` 构造函数被当作普通函数调用时（如上所示），会将传递给它的参数转换成数字。一元加号运算符也可以完成同样的功能：

```
// Forcing a string to act as a number (using the unary plus operator).
console.log( foo + +bar ); // 3
```

## 逻辑运算符

逻辑运算符允许通过与（`&&`）和或（`||`）运算符来对一系列的运算数进行运算。

```
// Logical AND and OR operators

var foo = 1;
var bar = 0;
var baz = 2;

// returns 1, which is true
foo || bar;

// returns 1, which is true
bar || foo;

// returns 0, which is false
foo && bar;

// returns 2, which is true
foo && baz;

// returns 1, which is true
baz && foo;
```

在上面的例子中，`||` 运算符返回第一个真值运算数的值，或者在运算数都是真值的情况下返回最后一个运算数的值。`&&` 运算符返回第一个假值运算数的值，或者当运算数都是真值的情况下返回最后一个运算数的值。

通常你会看到开发者使用逻辑操作符来替代 `if` 语句进行流程控制。例如：

```
// Do something with foo if foo is truthy.
foo && doSomething( foo );

// Set bar to baz if baz is truthy;
// otherwise, set it to the return value of createBar()
var bar = baz || createBar();
```

这种风格比较优雅和简洁，但是也可能难于阅读或使用，特别是对新手来说。在[条件代码](/javascript-101/conditional-code.html)部分可查看更多关于真值和价值的事情。

## 比较运算符

比较运算符允许你来测试值是否相等或者是否相同。

```
// Comparison operators

var foo = 1;
var bar = 0;
var baz = "1";
var bim = 2;

foo == bar; // false
foo != bar; // true
foo == baz; // true; but note that the types are different

foo === baz;             // false
foo !== baz;             // true
foo === parseInt( baz ); // true

foo > bim;  // false
bim > baz;  // true
foo <= baz; // true
```

有关比较运算符的更多信息，可访问[Mozilla 开发者网络](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Operators/Comparison_Operators "MDN - 比较运算符")。
