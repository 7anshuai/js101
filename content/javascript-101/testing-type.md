# 类型测试

- pubdate: 2015-03-09

------

JavaScript 提供了一种方法来测试变量的类型。然而，其结果可能会让人迷惑 － 例如，一个数组的类型是 `object`。

当试图检测一个特定值的类型时，常见的做法是使用 `typeof` 运算符。

```
// Testing the type of various variables.
var myFunction = function() {
	console.log( "hello" );
};
var myObject = {
	foo: "bar"
};
var myArray = [ "a", "b", "c" ];
var myString = "hello";
var myNumber = 3;
var myRegExp = /(\w+)\s(\w+)/;

typeof myFunction; // "function"
typeof myObject;   // "object"
typeof myArray;    // "object" -- Careful!
typeof myString;   // "string"
typeof myNumber;   // "number"
typeof null;       // "object" -- Careful!
typeof undefined;  // "undefined"
typeof meh;        // "undefined" -- undefined variable.
typeof myRegExp;   // "function" or "object" depending on environment.


if ( myArray.push && myArray.slice && myArray.join ) {
	// probably an array (this is called "duck typing")
}

if ( Object.prototype.toString.call( myArray ) === "[object Array]" ) {
	// Definitely an array!
	// This is widely considered as the most robust way
	// to determine if a specific value is an Array.
}
```
