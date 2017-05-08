# 条件代码

- pubdate: 2015-03-11
- issue: 1

------

有时候一个代码块应该只在一定条件下运行。流程控制 － 通过 `if` 和 `else` 代码块，让你的代码只在满足一定的条件下运行。

```javascript
// Flow control

var foo = true;
var bar = false;

if ( bar ) {
	// This code will never run.
	console.log( "hello!" );
}

if ( bar ) {

	// This code won't run.

} else {

	if ( foo ) {
		// This code will run.
	} else {
		// This code would run if foo and bar were both false.
	}

}
```
虽然在单行 `if` 语句里，大括号不是必须的，但应该保持一致的使用它们，这样使得代码会更有可读性。

注意不要在 `if` 或 `else` 代码块中，多次定义相同名称的函数。因为这样做可能会得不到预期的结果。

## Truthy 和 Falsy

为了成功的使用流程控制，重要的一点是需要理解哪些类型的值是“truthy”，哪些是“falsy”。有时候一个值实际计算的结果和看起来应该会得到的结果不同。

```javascript
// Values that evaluate to false:
false
"" // An empty string.
NaN // JavaScript's "not-a-number" variable.
null
undefined // Be careful -- undefined can be redefined!
0 // The number zero.
```

```javascript
// Everything else evaluates to true, some examples:
"0"
"any string"
[] // An empty array.
{} // An empty object.
1 // Any non-zero number.
```

## 有条件的变量赋值与三元运算符

有时一个变量要根据一些条件而设定。可以使用 `if` 或 `else` 语句，但在许多情况下，三元运算符更加方便。三元运算符测试一个条件，如果条件为真，则返回一个确定的值，否则返回一个不同的值。

三元运算符：

```javascript
// Set foo to 1 if bar is true; otherwise, set foo to 0:
var foo = bar ? 1 : 0;
```

虽然三元运算符可以在不将返回值赋值给变量的情况下使用，但这是不推荐的。

## switch 语句

比起使用一系列的 `if` 或 `else` 代码块，有时使用一个 `switch` 语句替代会更有效。`switch` 语句查看一个变量或表达式的值，并根据不同的值执行不同的代码块。

```javascript
// A switch statement

switch ( foo ) {

	case "bar":
		alert( "the value was bar -- yay!" );
		break;

	case "baz":
		alert( "boo baz :(" );
		break;

	default:
		alert( "everything else is just ok" );

}
```

在 JavaScript 中 switch 语句有些不太流行，因为同样的行为可以通过创建一个可重用和易测试的对象来完成。

```javascript
var stuffToDo = {

	"bar": function() {
		alert( "the value was bar -- yay!" );
	},

	"baz": function() {
		alert( "boo baz :(" );
	},

	"default": function() {
		alert( "everything else is just ok" );
	}

};

// Check if the property exists in the object.
if ( stuffToDo[ foo ] ) {
	// This code won't run.
	stuffToDo[ foo ]();

} else {
	// This code will run.
	stuffToDo[ "default" ]();

}
```

对象会在 [类型](/javascript-101/types.html) 和 [对象](/javascript-101/objects.html) 部分进一步讨论。
