# 闭包

- pubdate: 2015-04-21
- issue: 1

--------

> 原文链接：https://github.com/jquery/learn.jquery.com/tree/v0.6.1/page/javascript-101/closures.md

闭包是作用域概念的扩展。通过闭包，函数可以访问存在函数被创建的作用域中的变量。如果这显得令人困惑，别担心：闭包一般最适合通过例子来理解。

如同[作用域](scope.html)部分所示，函数可以访问变化的变量值。定义在循环中的函数也存在同样的行为 － 即使在函数定义之后，它依然能观察到变量的值发生了改变，导致每一个函数都引用了保存在变量中的最后值。

```javascript
// Each function executed within the loop will reference
// the last value stored in i (5).
// This won't behave as we want it to - every 100 milliseconds, 5 will alert
for ( var i = 0; i < 5; i++ ) {
	setTimeout(function() {
		alert( i );
	}, i * 100 );
}
```

闭包可以用来防止这种情况，通过给每一次迭代创建一个独特的作用域 － 在其作用域内保存变量的每一个独特值。

```javascript
// Using a closure to create a new private scope
// fix: “close” the value of i inside createFunction, so it won't change
var createFunction = function( i ) {
	return function() {
		alert( i );
	};
};

for ( var i = 0; i < 5; i++ ) {
	setTimeout( createFunction( i ), i * 100 );
}
```

闭包也可以用来解决 `this` 关键字的问题，它是每个作用域的唯一值：

```javascript
// Using a closure to access inner and outer object instances simultaneously.
var outerObj = {
	myName: "outer",
	outerFunction: function() {

		// Provide a reference to outerObj through innerFunction's closure
		var self = this;
		var innerObj = {
			myName: "inner",
			innerFunction: function() {
				console.log( self.myName, this.myName ); // "outer inner"
			}
		};

		innerObj.innerFunction();

		console.log( this.myName ); // "outer"
	}
};

outerObj.outerFunction();
```

## Function.bind

当处理回调函数时，闭包也是特别有用的。但是，通常更好的做法是使用 `Function.bind`，它可以避免任何作用域遍历相关的过度开销。

`Function.bind` 被用来创建一个新函数。当新函数被调用时，函数会在 `.bind()` 方法中提供的 `this` 上下文中执行，并使用一系列 `.bind()` 方法中提供的参数与函数调用时提供的任何参数。

由于 `.bind()` 是在 ECMAScript 5 中添加的，它可能不会得到所有浏览器的支持，当决定是否使用它时，这是值得注意的一点。不过，我们可以使用 MDN 提供的[兼容代码](https://developer.mozilla.org/zh-CN/JavaScript/Reference/Global_Objects/Function/bind)来使 `.bind()` 正常工作。

```javascript
// Shim from MDN
if (!Function.prototype.bind) {

	Function.prototype.bind = function( oThis ) {

		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal
			// IsCallable function
			throw new TypeError( "Function.prototype.bind - what is trying to be bound is not callable" );
		}

		var fSlice = Array.prototype.slice,
			aArgs = fSlice.call( arguments, 1 ),
			fToBind = this,
			fNOP = function() {},
			fBound = function() {
				return fToBind.apply( this instanceof fNOP
					? this
					: oThis || window,
					aArgs.concat( fSlice.call( arguments ) ) );
			};

		fNOP.prototype = this.prototype;

		fBound.prototype = new fNOP();

		return fBound;
	};
}
```

`.bind()` 最简单的用途之一是创建一个使用特定 `this` 值的函数，而无关该函数是如何调用的。一个开发者常常出现的错误是试图从对象中提取一个方法，在随后调用该方法时期望使用原始对象作为 `this` 值。这时可以通过创建一个函数绑定原始对象来解决类似问题，如下所示：

```javascript
// Let's manipulate "this" with a basic example.
var user = "johnsmith";
var module = {
	getUser: function() {
		return this.user;
	},
	user: "janedoe"
};

// module.getUser() is called where "module" is "this"
// and "module.user" is returned.

// janedoe
module.getUser();

// let's now store a reference in the global version of "this"
var getUser = module.getUser;

// getUser() called, "this" is global, "user" is returned

// johnsmith
getUser();

// store a ref with "module" bound as "this"
var boundGetUser = getUser.bind( module );

// boundGetUser() called, "module" is "this" again, "module.user" returned.

// janedoe
boundGetUser();
```
