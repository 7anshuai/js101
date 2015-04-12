# this 关键字

- pubdate: 2014-04-12

-------

在 JavaScript 中，如同在大部分面向对象编程语言中一样，`this` 是一个特殊的关键字，它常在被某个对象调用的方法中指向对象本身。`this` 的值可通过一系列简单的步骤来确定：

- 如果函数是通过 `Function.call()` 或者 `Function.apply()` 调用，`this` 的值将会被设置为传递给 `.call()` 或 `.apply()` 的第一个参数。如果传递给 `.call()` 或 `.apply()` 的第一个参数是 `null` 或 `undefined`，`this` 会指向全局对象（在 Web 浏览器中是 `window` 对象）。
- 如果被调用的函数是由 `Function.bind()` 创建的，`this` 将会是该函数被创建时传递给 `.bind()` 的第一个参数。
- 如果函数是作为一个对象的方法被调用，`this` 将会指向那个对象。
- 否则，当函数作为一个不依附任何对象的独立函数被调用，`this` 会指向全局对象。

```javascript
// A function invoked using Function.call()

var myObject = {
	sayHello: function() {
		console.log( "Hi! My name is " + this.myName );
	},
	myName: "Rebecca"
};

var secondObject = {
	myName: "Colin"
};

myObject.sayHello();                    // "Hi! My name is Rebecca"
myObject.sayHello.call( secondObject ); // "Hi! My name is Colin"
```

```javascript
// A function created using Function.bind()

var myName = "the global object";
var sayHello = function() {
	console.log( "Hi! My name is " + this.myName );
};
var myObject = {
	myName: "Rebecca"
};
var myObjectHello = sayHello.bind( myObject );

sayHello();      // "Hi! My name is the global object"
myObjectHello(); // "Hi! My name is Rebecca"
```

```javascript
// A function being attached to an object at runtime.

var myName = "the global object";
var sayHello = function() {
	console.log( "Hi! My name is " + this.myName );
};
var myObject = {
	myName: "Rebecca"
};
var secondObject = {
	myName: "Colin"
};

myObject.sayHello = sayHello;
secondObject.sayHello = sayHello;

sayHello();              // "Hi! My name is the global object"
myObject.sayHello();     // "Hi! My name is Rebecca"
secondObject.sayHello(); // "Hi! My name is Colin"
```

当深度调用一个长命名空间的函数时，它通常会诱使你使用一个单一简短的变量来引用实际的函数，以减少你所需要键入的代码。重点是实例方法不能这么做，因为这会导致函数内的 `this` 值发生改变，从而导致不正确的结果。例如：

```javascript
var myNamespace = {
	myObject: {
		sayHello: function() {
			console.log( "Hi! My name is " + this.myName );
		},
		myName: "Rebecca"
	}
};

var hello = myNamespace.myObject.sayHello;

hello(); // "Hi! My name is undefined"
```

但是，你可以安全的减少所有代码，直到方法被调用的那个对象：

```javascript
var myNamespace = {
	myObject: {
		sayHello: function() {
			console.log( "Hi! My name is " + this.myName );
		},
		myName: "Rebecca"
	}
};

var obj = myNamespace.myObject;

obj.sayHello(); // "Hi! My name is Rebecca"
```
