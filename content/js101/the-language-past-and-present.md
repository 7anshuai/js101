# JavaScript 的过去和现在

- pubdate: 2016-03-19

-------

一个重要的问题：JavaScript 是什么，它由谁掌控？

在 [History of JavaScript](http://dailyjs.com/history-of-javascript-index/) 系列中，我已经详细回答了这个问题。这篇文章是一个简单的介绍，读完之后你应该知道了JavaScript 的基础知识以及它和 ECMAScript 的关系。

## 谁创造了 JavaScript？
在1995年，Brendan Eich 为网景创造了 JavaScript。网景将 JavaScript 提交到了 [Ecma International](http://www.ecma-international.org/)，一个在日内瓦的标准组织。标准化的 版本就是 ECMAScript。

## ECMAScript 是什么？
多数网站（比如 DailyJS）上的文章会引用 ECMA-262， ECMAScript 3 和 ECMAScript 5。 通常会简称为 ES3 和 ES5。

- [ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) 是规范的名称，它有五个版本
- ECMAScript 3 (或 ECMA-262, 版本 3) 发布于1999年12月，Netscape 6 和 IE 5.5 支持该标准
- ECMAScript 5 (或 ECMA-262, 版本 5) 发布于2009年12月，它被 Firefox 4+ 和 Safari 6 支持: [ES5 兼容性表格](http://kangax.github.com/es5-compat-table/)

ECMAScript 5 添加了许多新的特性：包括新的数组方法像 `forEach`，新的 `Object` 方法比如 `Object.create`，新的属性，函数绑定，等等。

## 未来
ECMAScript 仍在积极发展。被称为 ES.next（ECMA-262 版本 6），ES.next 工作草案可以从 [ECMAScript 维基](http://wiki.ecmascript.org/) 下载。

语言的建议被收集在稻草人维基，并通过在 wiki 和邮件列表的几个贡献者详细讨论。为了跟上语言的发展，我经常检查维基最近的变化和 es-discuss 邮件列表。

[Brendan Eich 的博客](https://brendaneich.com/) 包含了大量的主要开发详情。例如，他 [最近的文章](https://brendaneich.com/2012/06/recent-talks-fluent-txjs-2012/) 提到了 ES6 以及标准制定者和热情的 JavaScript 开发者社区之间的关系。
语言会有所改变，随着新标准的制定，你需要知道你给定的平台或浏览器支持。
