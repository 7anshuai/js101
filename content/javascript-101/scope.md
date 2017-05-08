# 作用域

- pubdate: 2015-04-19
- issue: 1

-------

> 原文链接：https://github.com/jquery/learn.jquery.com/tree/v0.6.1/page/javascript-101/scope.md

作用域通常是指在指定的时间内，变量存在于一段代码中。缺乏对作用域的理解可能会导致令人沮丧的调试体验。作用域的概念是关于我们的代码中可以访问到哪些确定的函数或变量，代码的上下文和执行环境。

在 JavaScript 中，有两种类型的作用域：全局和局部作用域。

## 全局作用域

第一种作用域是__全局作用域__。它很容易定义。如果一个变量或函数是_全局的_，那么在程序中的任何地方都可以访问到它们。在浏览器中，全局作用域是 `window` 对象。如果在函数外面声明一个变量，那么这个变量就存在全局对象中。例如：

```javascript
var x = 9;
```

一旦该变量被定义，则可以被引用为 `window.x`，因为它存在于全局对象中，我们可以简单的引用它为 `x`。

## 局部作用域

JavaScript 也可以在每个函数体中创建__局部作用域__。例如：

```javascript
function myFunc() {
	var x = 5;
}

myFunc();

console.log( x ); // ReferenceError: x is not defined
```

由于 `x` 是在 `myFunc()` 中初始化，所以它只能在 `myFunc()` 中被访问，如果我们试图在 `myFunc()` 外面访问 `x`，则会得到一个引用错误。

## 注意

如果你忘记使用 `var` 关键字声明变量，那么这个变量会自动变成全局变量。所以这段代码可以运行：

```javascript
function myFunc() {
	x = 5;
}

myFunc();

console.log( x ); // 5
```

这是一个坏主意。全局变量的值可以被程序的任何部分或者其他脚本更改。这是不期望发生的，因为它会导致无法预料的副作用。

立即调用表达式（IIFE）提供了一个避免全局变量的方式。你会看到许多如 jQuery 的 JavaScript 库经常使用这种方式：

```javascript
(function() {
	var jQuery = { /* All my methods go here. */ };
	window.jQuery = jQuery;
})();
```

将一切包含在一个函数中并立即调用这个函数，这意味着函数中的所有变量都被绑定在_局部作用域_中。在函数结尾部分，你可以通过将 `jQuery` 对象绑定在全局对象 `window` 上，将一些方法和属性公开出来。了解更多关于立即调用函数表达式，请查看 Ben Alman 的文章 [Immediately-Invoked Function Expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)。

因为局部作用域通过函数而工作，任何在另一个函数中定义的函数都可以访问外部函数里的变量：

```javascript
function outer() {
	var x = 5;

	function inner() {
		console.log( x );
	}

	inner(); // 5
}
```

但是 `.outer()` 函数不能访问 `.inner()` 函数中定义的任何变量。

```javascript
function outer() {
	var x = 5;

	function inner() {
		console.log( x );
		var y = 10;
	}

	inner(); // 5

	console.log( y ); // ReferenceError: y is not defined
}
```

另外，在一个函数中没有使用 `var` 关键字定义的变量不是这个函数的局部变量 － JavaScript 会向上遍历作用域链（最后会到 `window` 对象）寻找之前定义的这个变量。如果这个变量没有定义，则会在全局中定义该变量，这样会导致意外的结果。

```javascript
// Functions have access to variables defined in the same scope.

var foo = "hello";

var sayHello = function() {
	console.log( foo );
};

sayHello(); // "hello"

console.log( foo ); // "hello"
```

相同名称的变量可以在不同作用域中保存不同的值：

```javascript
var foo = "world";

var sayHello = function() {
	var foo = "hello";
	console.log( foo );
};

sayHello(); // "hello"

console.log( foo ); // "world"
```

当在一个函数中引用一个外部作用域定义的变量，函数可以访问在该函数定义之后发生改变的变量值。

```javascript
var myFunction = function() {
	var foo = "hello";
	var myFn = function() {
		console.log( foo );
	};
	foo = "world";
	return myFn;
};

var f = myFunction();

f(); // "world"
```

这是一个更复杂的作用域例子：

```javascript
(function() {

	var baz = 1;

	var bim = function() {
		console.log( baz );
	};

	bar = function() {
		console.log( baz );
	};

})();
```
在这个实例中，运行：

```javascript
console.log( baz ); // baz is not defined outside of the function
```

将会得到一个 `ReferenceError`。`baz` 仅仅是在函数中定义，并且没有暴露在全局作用域中。

```javascript
bar(); //  1
```

`.bar()` 是在匿名函数中定义的， 但是它没有使用 `var` 关键字定义，这意味着它没有绑定到局部作用域，而是在全局作用域创建。另外，它可以访问 `baz`
变量，因为 `.bar()` 是在与 `baz` 相同的作用域定义的，所以它可以访问变量 `baz`，即使函数外部的其他代码不可以。


```javascript
bim(); // ReferenceError: bim is not defined
```

`.bim()` 只在函数中定义的，所以它作为局部变量而不存在于全局对象中。
