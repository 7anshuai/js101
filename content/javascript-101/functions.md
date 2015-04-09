# 函数

- pubdate: 2015-04-09

-------

函数包含需要反复执行的代码块。函数可以取零个或多个参数，并且可以可选的返回一个值。

函数可以通过各种方式创建，其中两个方式如下：

```javascript
// Function declaration.

function foo() {
	// Do something.
}
```

```javascript
// Function expression.

var foo = function() {
	// Do something.
};
```

## 使用函数

```javascript
// A simple function.

var greet = function( person, greeting ) {
	var text = greeting + ", " + person;
	console.log( text );
};

greet( "Rebecca", "Hello" ); // "Hello, Rebecca"
```

```javascript
// A function that returns a value.

var greet = function( person, greeting ) {
	var text = greeting + ", " + person;
	return text;
};

console.log( greet( "Rebecca", "Hello" ) ); // "Hello, Rebecca"
```

```javascript
// A function that returns another function.

var greet = function( person, greeting ) {
	var text = greeting + ", " + person;
	return function() {
		console.log( text );
	};
};

var greeting = greet( "Rebecca", "Hello" );

greeting(); // "Hello, Rebecca"
```

## 立即调用函数表达式（IIFE）

在 JavaScript 中一个常见的模式是立即调用函数表达式。这种模式创建一个函数表达式然后立即执行。IIFE 在要避免污染全局命名空间的情况下非常有用 － 函数内声明的变量，在外部是不可见的。

```javascript
// An immediately-invoked function expression.

(function() {
	var foo = "Hello world";
})();

console.log( foo ); // undefined!
```

## 作为参数的函数

在 JavaScript 中，函数是“一等公民” － 它们可以被赋给变量或者作为参数传递给另一个函数。传递函数作为参数是 jQuery 中的惯用法。

```javascript
// Passing an anonymous function as an argument.

var myFn = function( fn ) {
	var result = fn();
	console.log( result );
};

// Logs "hello world"
myFn( function() {
	return "hello world";
});
```

```javascript
// Passing a named function as an argument

var myFn = function( fn ) {
	var result = fn();
	console.log( result );
};

var myOtherFn = function() {
	return "hello world";
};

myFn( myOtherFn ); // "hello world"
```
