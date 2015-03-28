# 入门

- pubdate: 2015-02-28

------

## 网页的解剖学

在深入 JavaScript 之前，对网页的解剖有助于理解 JavaScript 是如何与其他网络技术密切合作的。

## HTML 是内容

HTML 是用来定义和描述内容的标记语言。无论是博客文章，搜索引擎结果，或者电商网站，网页的核心内容都是用 HTML 编写的。语义标记是指 HTML 中用来描述内容的通用术语（头部，段落，图片等）。

## CSS 是表现

CSS 是一个为 HTML 文档应用样式的附加语言。CSS 的全部都是关于如何通过定义字体，颜色等其他视觉美感，让内容更好看。CSS 的强大之处在于样式不再和内容夹杂，这意味着你可以将不同的样式应用到同一块内容，当构建良好的跨设备响应式网站时，这是至关重要的。

## JavaScript 是交互

在浏览器中，JavaScript 为 HTML 内容添加交互性和行为能力。没有 JavaScript，网页将会是静态和无聊的。JavaScript 使网页富有生命力。

看下面这个包含了 CSS 和 JavaScript 的简单 HTML 页面，了解这一切是如何组织在一起的：

```html
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Hello World</title>

	<!-- CSS for presentation. -->
	<style>
	h1 { font-size: 14px; color: hotpink; }
	button { color: red; }
	</style>
</head>
<body>
	<h1>Hello World</h1>
	<button>Click Me!</button>

	<!-- JavaScript for interactivity. -->
	<script>

	// Get a handle on the first button element in the document.
	var button = document.querySelector( "button" );

	// If a user clicks on it, say hello!
	button.addEventListener( "click", function( ev ) {
		alert( "Hello" );
	}, false);

	</script>
</body>
</html>
```

在上面的例子中，HTML 是用来描述内容，“Hello World” 文本被 `h1` 元素描述为一个标题，“Click Me!” 被 `button` 元素描述为一个按钮。`style` 代码块包含了改变标题颜色和字体大小的 CSS。`script` 代码块包含了给按钮添加交互的 JavaScript。当用户点击这个按钮，会弹出一个显示“Hello”的警告信息。

## Web 的脚本语言

JavaScript 最初设计为网页添加交互性，而不是成为一个通用语言，所以它被设计为脚本语言。[脚本语言](http://zh.wikipedia.org/wiki/%E8%84%9A%E6%9C%AC%E8%AF%AD%E8%A8%80) 被认为是比通用语言更高效，因为它们是为特定的领域（如 JavaScript 为网络浏览器）而优化。然而，最近的技术发展让 JavaScript 在服务器端大热（通过 [Node.js](http://nodejs.org/)），所以它现在也可以用于代替 PHP，Ruby 或者 ASP 等语言。本指南将专注于在浏览器中运行的 JavaScript。

“JavaScript” 这个名字有点误导性。尽管有相似的名字，但是 JavaScript 与 [Java](https://zh.wikipedia.org/wiki/Java)（一种通用语言）没有任何关系。JavaScript 是基于开放式网络标准 ECMAScript。基于标准的语言不是任何一个实体或公司控制的－相反的，开发商们共同制定语言，这就是为什么 JavaScript 运行在每一个 Web 浏览器中，而无关操作系统或设备。

## 你需要什么来开始学习 JavaScript 和 jQuery

1. Web 浏览器
2. 文本编辑器
3. 开发者工具 (可选项)

JavaScript 的最大优势之一是它的简单。它可以在任何操作系统上编写和运行，唯一的要求是一个网络浏览器和文本编辑器。也有许多工具可以让 JavaScript 开发更有效率，但它们是完全可选的。

## 开发者工具

许多浏览器附带的内置功能，通常被称为“开发者工具”，它提供了更好的视角来观察运行在浏览器里的 JavaScript 和 jQuery。虽然不是必须的，但当你调试代码错误时，你会发现开发者工具很有用。看看常见的浏览器开发者工具：

- [Safari 开发者工具](https://developer.apple.com/cn/technologies/safari/developer-tools.html)
- [Google Chrome Developer Tools](https://developers.google.com/chrome-developer-tools/)
- [IE 开发者工具](http://msdn.microsoft.com/zh-cn/library/ie/gg589507.aspx)
- [火狐开发者工具](https://developer.mozilla.org/zh-CN/docs/Tools)
- [Opera Dragonfly](http://www.opera.com/dragonfly/)
