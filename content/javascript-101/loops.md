# 循环

- pubdate: 2015-03-17
- issue: 1

------

循环让一块代码运行一定的次数：

```javascript
for ( var i = 0; i < 5; i++ ) {
	// Logs "try 0", "try 1", ..., "try 4".
	console.log( "try " + i );
}
```

需要注意的是在循环中，变量 `i` 的不仅仅作用于循环代码块，即使在变量名前使用了关键字 `var`。在[作用域](/javascript-101/scope.html)部分将对作用域进行深入讨论。

## `for` 循环

一个 `for` 循环由四个语句组成，并具有以下结构：

```javascript
for ( [initialization]; [conditional]; [iteration] ) {

	[loopBody]

}
```

初始化语句（_initialization_）在循环开始前只执行一次。它是用来准备或声明任何变量的。

条件语句（_conditional_）在每次迭代之前执行，它会返回一个值用来判断循环是否继续。如果条件语句的计算结果为一个假值，则循环停止。

迭代语句（_iteration_）在每次迭代结束时执行，它给你一个机会来改变重要变量的状态。通常，这将涉及递增或递减一个计数器，从而使循环接近结束。

循环体语句（_loopBody_）是每一次循环执行的内容，它可以包含任何东西。通常，会有需要被执行的多行语句，并应包裹在一个代码块中（`{...}`）。

一个典型的 `for` 循环：

```javascript
for (var i = 0, limit = 100; i < limit; i++) {
	// This block will be executed 100 times.
	console.log( "Currently at " + i );
	// Note: The last log will be "Currently at 99".
}
```

## `for...in` 循环

一个 `for...in` 循环遍历一个对象的属性，针对每一个属性，循环体语句可以被执行一次。

```javascript
for ( prop in obj ) {
	// statements here will be executed for every key in the object
	console.log( prop + ': ' + obj[ prop ] );
}
```


## `while` 循环

一个 `while` 循环类似于一个 `if` 语句，不同之处在于它的主体部分会继续执行，直到条件语句计算结果为一个假值。

```javascript
while ( [conditional] ) {

	[loopBody]

}
```

一个典型的 `while` 循环：

```javascript
var i = 0;
while ( i < 100 ) {
	// This block will be executed 100 times.
	console.log( "Currently at " + i );
	i++; // Increment i
}
```

需要注意的是计数器是在循环的主体部分递增的。将条件和增量合并也是可行的，像这样：

```javascript
var i = -1;
while ( ++i < 100 ) {
	// This block will be executed 100 times.
	console.log( "Currently at " + i );
}
```

请注意计数器开始于－1，并使用前置增量符（`++i`）。

## `do-while` 循环

这几乎是与 `while` 循环完全一样的，不同的是实际上它的循环主体内容在条件测试之前至少会执行一次。

```javascript
do {

	[loopBody]

} while ( [conditional] )
```

一个 `do-while` 循环：

```javascript
do {
	// Even though the condition evaluates to false
	// this loop's body will still execute once.
	alert( "Hi there!" );

} while ( false );
```

这一类型的循环是少见的，因为只有极少数情况下需要盲目的执行一次循环。无论如何，意识到这一点就好。

## `break` 和 `continue`

通常的，条件语句的计算结果不是一个真值会导致循环的终止，但是也可以通过循环内部的 `break` 语句将循环在其正常运行轨道期终止：

```javascript
// Stopping a loop
for ( var i = 0; i < 10; i++ ) {
	if ( something ) {
		break;
	}
}
```

你可能还需要继续循环，但不执行循环主体内的部分内容。这可以通过 `continue` 语句做到：

```javascript
// Skipping to the next iteration of a loop
for ( var i = 0; i < 10; i++ ) {
	if ( something ) {
		continue;
	}

	// The following statement will only be executed
	// if the conditional "something" has not been met
	console.log( "I have been reached" );

}
```
