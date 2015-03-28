# 语法基础

- pubdate: 2015-03-06

-------

### 注释

JavaScript 支持单行和多行注释。注释会被 JavaScript 引擎忽略，所以它对程序的结果没有影响。使用注释为其他开发者记录代码，像 [JSDoc](http://usejsdoc.org/ "JSDoc") 这类工具库，可以帮助生成基于注释的项目文档页面。

```javascript
// Single- and multi-line comments.

// This is an example of a single-line comment.

/*
 * this is an example
 * of a
 * multi-line
 * comment.
 */
```

### 空白

空白也被 JavaScript 引擎忽略。有许多工具可以用来去掉程序中的空白，降低了文件的整体大小和改进网络延迟。鉴于这类工具的可用性，空白应该加以利用，以使代码尽可能的易读。

```javascript
// Whitespace is insignificant.
var hello = "Hello";
var world     =      "World!";
```

```javascript
// Semantic whitespace promotes readability.
// Readable code is good!
var foo = function() {

	for ( var i = 0; i < 10; i++ ) {

		alert( i );

	}

};

foo();

// This is much harder to read!
var foo=function() {for(var i=0;i<10;i++){alert(i);}};foo();
```

### 保留字

当声明用户定义的变量和函数时，有少量的保留字不能被使用。一些保留字已经被实现，一些被保留以供将来使用，还有一些事因为历史原因而保留。[这里](/javascript-101/reserved-words.html)是保留字的列表，对保留字的深入解释可以在[ MDN 的 JavaScript 参考](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Reserved_Words "MDN 保留字")当中找到。

### 标识符

标识符被用来给变量和函数的唯一名称，以便随后它们可以通过该名称被引用到。标识符名称必须遵循一些规则：

* 不能是保留字。
* 只能由字母，数字，美元符号和下划线组成。
* 第一个字符不能是数字。

命名标识符的最佳实践是选取一个将来也能对你或者其他开发者有意义的名称。

```javascript
// Valid identifier names.
var myAwesomeVariable = "a";
var myAwesomeVariable2 = "b";
var my_awesome_variable = "c";
var $my_AwesomeVariable = "d";
var _my_awesome_variable_$ = "e";
```

### 变量定义

变量可以使用多个 `var` 语句来定义，或者使用单个组合的 `var` 语句。

```javascript
// This works:
var test = 1;
var test2 = function() { ... };
var test3 = test2( test );

// And so does this:
var test4 = 1,
	test5 = function() { ... },
	test6 = test2( test );
```

变量可以在声明时不分配一个值，程序会给它们一个默认的值 `undefined`。

```javascript
var x;
x === undefined; // true
```
