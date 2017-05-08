# 数组

- pubdate: 2015-03-28
- issue: 1

-------

> 原文链接：https://github.com/jquery/learn.jquery.com/tree/v0.6.1/page/javascript-101/arrays.md

数组是从零索引，值的有序列表。数组是一个简便的方式来存储一组相同类型的有关项（例如字符串），但实际上，一个数组可以包含多个类型的项，甚至是其他数组。

创建一个数组，可以使用数组构造函数或者字面量声明式，在声明后，可以赋给变量一系列的值。

```javascript
// A simple array with constructor.
var myArray1 = new Array( "hello", "world" );

// Literal declaration, the preferred way.
var myArray2 = [ "hello", "world" ];
```

字面量声明式通常是更好的选择。查看[谷歌编码指南](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml#Array_and_Object_literals)可获得更多信息。

如果值是未知的，也可以创建一个空的数组，然后通过数组方法或者访问索引来添加元素：

```javascript
// Creating empty arrays and adding values

var myArray = [];

// Adds "hello" on index 0
myArray.push( "hello" );

// Adds "world" on index 1
myArray.push( "world" );

// Adds "!" on index 2
myArray[ 2 ] = "!";
```

`.push()` 是一个函数，它扩展数组并添加一个元素到尾端。您也可以直接通过索引添加项。缺失的指数项将会被 `undefined` 填充。

```javascript
// Leaving indices

var myArray = [];

myArray[ 0 ] = "hello";
myArray[ 1 ] = "world";
myArray[ 3 ] = "!";

console.log( myArray ); // [ "hello", "world", undefined, "!" ];
```

如果数组的大小是未知的，`.push()` 是更安全的。您可以通过索引取值或者赋值给数组项。

```javascript
// Accessing array items by index

var myArray = [ "hello", "world", "!" ];

console.log( myArray[ 2 ] ); // "!"
```

## 数组方法和属性

### .length

`.length` 属性用于确定数组项的数量。

```javascript
// Length of an array

var myArray = [ "hello", "world", "!" ];

console.log( myArray.length ); // 3
```

您将需要 `.length` 属性用于遍历一个数组：

```javascript
// For loops and arrays - a classic

var myArray = [ "hello", "world", "!" ];

for ( var i = 0; i < myArray.length; i = i + 1 ) {

	console.log( myArray[ i ] );

}
```

### .concat()

通过 `.concat()` 串联两个或多个数组：

```javascript
var myArray = [ 2, 3, 4 ];
var myOtherArray = [ 5, 6, 7 ];
var wholeArray = myArray.concat( myOtherArray ); // [ 2, 3, 4, 5, 6, 7 ]
```

### .join()

`.join()` 使用一个分隔字符拼接数组的所有元素并创建数组的字符串表示。如果没有提供分隔符（即不带参数调用 `.join()`），数组会使用逗号进行拼接。

```javascript
// Joining elements

var myArray = [ "hello", "world", "!" ];

// The default separator is a comma.
console.log( myArray.join() );     // "hello,world,!"

// Any string can be used as separator...
console.log( myArray.join( " " ) );  // "hello world !";
console.log( myArray.join( "!!" ) ); // "hello!!world!!!";

// ...including an empty one.
console.log( myArray.join( "" ) );   // "helloworld!"

```

### .pop()

`.pop()` 移除数组的最后一个元素。它是 `.push()` 的对立方法：

```javascript
// Pushing and popping

var myArray = [];

myArray.push( 0 ); // [ 0 ]
myArray.push( 2 ); // [ 0 , 2 ]
myArray.push( 7 ); // [ 0 , 2 , 7 ]
myArray.pop();     // [ 0 , 2 ]
```

### .reverse()

顾名思义，调用 `.reverse()` 方法后，数组中的元素按相反的顺序排列：

```javascript
var myArray = [ "world" , "hello" ];
myArray.reverse(); // [ "hello", "world" ]
```

### .shift()

移除数组中的第一个元素。结合 `.push` 和 `.shift()`，你可以重建一个[队列](http://zh.wikipedia.org/wiki/%E9%98%9F%E5%88%97)方法：

```javascript
// Queue with shift() and push()

var myArray = [];

myArray.push( 0 ); // [ 0 ]
myArray.push( 2 ); // [ 0 , 2 ]
myArray.push( 7 ); // [ 0 , 2 , 7 ]
myArray.shift();   // [ 2 , 7 ]
```

### .slice()

提取数组的一部分，并返回一个包含该部分的新数组。这个方法需要一个参数，起始的索引：

```javascript
// Slicing

var myArray = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
var newArray = myArray.slice( 3 );

console.log( myArray );  // [ 1, 2, 3, 4, 5, 6, 7, 8 ]
console.log( newArray ); // [ 4, 5, 6, 7, 8 ]
```

`.slice()` 方法有一个可选的第二个参数，结束的索引。

```javascript
console.log( [ 1, 2, 3, 4, 5, 6, 7, 8 ].slice( 2, 5 ) ); // [ 3, 4, 5 ]
```

### .splice()

移除一个确定数量的元素并在给定的索引处开始添加新的元素。它至少需要三个参数：

```javascript
myArray.splice( index, length, values, ... );
```

* *Index* – 开始的索引。
* *Length* – 移除的元素数量。
* *Values* – 在索引的位置插入的值。

例如：

```javascript
var myArray = [ 0, 7, 8, 5 ];
myArray.splice( 1, 2, 1, 2, 3, 4 );

console.log( myArray ); // [ 0, 1, 2, 3, 4, 5 ]
```

### .sort()

数组排序。它需要一个参数，一个比较函数。如果没有提供这个函数，数组默认按照升序进行排序：

```javascript
// Sorting without comparing function.

var myArray = [ 3, 4, 6, 1 ];

myArray.sort(); // 1, 3, 4, 6
```

```javascript
// Sorting with comparing function.

function descending( a, b ) {
	return b - a;
}

var myArray = [ 3, 4, 6, 1 ];

myArray.sort( descending ); // [ 6, 4, 3, 1 ]
```

例子中的 `descending` 函数返回的值很重要。如果返回的值小于0，`a` 的位置在 `b` 之前，如果值大于0则位置相反。如果值等于0，则元素的位置（与当前）相同。

### .unshift()

在数组的第一个位置插入一个元素：

```javascript
var myArray = [];

myArray.unshift( 0 ); // [ 0 ]
myArray.unshift( 2 ); // [ 2 , 0 ]
myArray.unshift( 7 ); // [ 7 , 2 , 0 ]
```

### .forEach()

在现代浏览器中可以使用 `.forEach()` 方法遍历数组，您传递个这个方法的函数会被数组中的每个元素调用。

被传递的函数可以带三个参数：

* *Element* – 元素本身。
* *Index* – 元素在数组中的索引。
* *Array* – 数组本身。

所有的参数都是可选的，但你通常至少需要一个 *Element* 参数。

```javascript
// Native .forEach()

function printElement( elem ) {
	console.log( elem );
}

function printElementAndIndex( elem, index ) {
	console.log( "Index " + index + ": " + elem );
}

function negateElement( elem, index, array ) {
	array[ index ] = -elem;
}

myArray = [ 1, 2, 3, 4, 5 ];

// Prints all elements to the console
myArray.forEach( printElement );

// Prints "Index 0: 1", "Index 1: 2", "Index 2: 3", ...
myArray.forEach( printElementAndIndex );

// myArray is now [ -1, -2, -3, -4, -5 ]
myArray.forEach( negateElement );
```
