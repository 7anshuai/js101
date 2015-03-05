# 运行代码

- pubdate: 2015-03-03

------

### 外部

第一种也是推荐的方式是在一个外部文件（带有 `.js` 扩展名）编写代码，然后可以使用 HTML `script` 元素并通过 `src` 属性指定文件的位置来引入到网页中。当你需要将代码重复使用在其他页面时，保持 JavaScript 在一个单独的文件中可以减少代码的重复。另外它也可以让浏览器将文件缓存到客户端的计算机上，减少网页加载时间。

```
<!-- Code is written in a .js file, included via the script tag src attribute. -->
<script src="/path/to/example.js"></script>
```
### 内嵌

第二种方式是直接将代码内嵌在网页中。它也是通过 HTML `script` 元素实现，但不是通过 `src` 属性指定一个文件，而是将代码放置在元素中间。虽然有些情况下可以使用这种方式，但大部分时间，最好是如上所述将我们的代码放置在外部文件中。

```
<!-- Embed code directly on a web page using script tags. -->
<script>
alert( "Hello World!" );
</script>
```

### 属性

最后一个选择是使用 HTML 元素的事件处理程序属性。这种方式是强烈不推荐的：

```
<!-- Inline code directly on HTML elements being clicked. -->
<a href="javascript:alert( 'Hello World' );">Click Me!</a>
<button onclick="alert( 'Good Bye World' );">Click Me Too!</button>
```

### 位置

在上面的前两个方式中，代码的位置是重要的，并且需要根据情况而改变。如果你添加不访问页面元素的 JavaScript，你可以放心的把脚本放在 HTML `</head>` 之前。但是，如果代码将于页面上的元素交互，就必须确保在执行代码时这些元素已经存在了。可以在下面的例子中看到这个常见的陷阱，一段查找 ID 为 `hello-world` 的元素脚本将会在页面定义元素之前执行。

```
<!doctype html>
<html>
<head>
	<script>
	// Attempting to access an element too early will have unexpected results.
	var title = document.getElementById( "hello-world" );
	console.log( title );
	</script>
</head>
<body>

<h1 id="hello-world">Hello World</h1>

</body>
</html>
```

一个常见的模式是将脚本移动到页面的底部，HTML `</body>` 前。这可以保证当执行代码时，元素已经在页面中定义了：

```
<!doctype html>
<html>
<head></head>
<body>

<h1 id="hello-world">Hello World</h1>
<script>
// Moving the script to the bottom of the page will make sure the element exists.
var title = document.getElementById( "hello-world" );
console.log( title );
</script>

</body>
</html>
```
