# JS101

JavaScript 101 - JavaScript 新手教程。

----------

[“Something 101” 是什么意思？](http://english.stackexchange.com/questions/14265/what-does-something-101-mean)

它通常是指“某事情的入门介绍”。这种说法的典故来源于美国教学系统中，大学初级课程代码101。课程代码101通常表示这是入门课程，没有其他的前提要求。

[JS101.co](http://js101.co) 是 JavaScript 的新手课堂，收集并翻译了 jQuery 学习中心与 DailyJS 的 JavaScript 101 教程。

目前已翻译完 jQuery 的 JavaScript 101系列文章，接下来会继续翻译 DailyJS 的进阶教程，欢迎 Fork and PR。

## 安装

JS101 使用基于 Node.js 的静态站点生成工具 [nico](https://github.com/lepture/nico)，可以通过 npm 来安装 nico：

```shell
npm install nico -g
```

全局安装 nico 后，使用 Git 克隆项目：

```shell

git clone https://github.com/7anshuai/js101.git && cd js101
```
## 运行

在终端运行：

```shell
nico server
```

就可以在当前目录下生成 `site` 静态文件文件夹，并在 `http:127.0.0.1:8000` 运行了一个静态服务器。

更多关于 nico 的信息，请参考 [nico 文档](http://lab.lepture.com/nico/zh/)。
