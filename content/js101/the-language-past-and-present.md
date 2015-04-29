# The Language Past and Present

-------

We've covered a lot of ground since the first JS101, but the truth is I've missed out an important question: what is JavaScript, and who controls it?

I've answered this question and covered a lot more in the History of JavaScript series. This post is a brief introduction, and after reading this post you should know the basics of JavaScript and its relationship to ECMAScript.

## Who Made JavaScript?
JavaScript was created by Brendan Eich in 1995 for Netscape. Netscape submitted JavaScript to [Ecma International](http://www.ecma-international.org/), which is a standards organization based in Geneva. The standardised version is known as ECMAScript.

## What is ECMAScript?
Most articles on sites like DailyJS will refer to ECMA-262, ECMAScript 3, and ECMAScript 5. We usually abbreviate these terms to ES3 and ES5.

- [ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) is the name of the specification, of which there are five editions
- ECMAScript 3 (or ECMA-262, edition 3) was published in December 1999, and was supported by Netscape 6 and IE 5.5
- ECMAScript 5 (or ECMA-262, edition 5) was published in December 2009 and is supported by Firefox 4+, Safari 6: [ES5 compatibility table](http://kangax.github.com/es5-compat-table/)

ECMAScript 5 adds a lot of features that we've already started to take for granted: including new array methods like `forEach`, new `Object` methods like `Object.create`, property attributes, function binding, and more.

## The Future
ECMAScript is still being actively developed. It's tentatively known as ES.next (ECMA-262 Edition 6), and ES.next working drafts can be downloaded from the [ECMAScript wiki](http://wiki.ecmascript.org/).

Proposals for the language are collected on the strawman wiki, and discussed in detail by several contributors on the wiki and mailing lists. To keep up with this, I often check the wiki's recent changes and the es-discuss mailing list.

[Brendan Eich's blog](https://brendaneich.com/) covers a lot of the major developments as well. For example, his [latest post](https://brendaneich.com/2012/06/recent-talks-fluent-txjs-2012/) mentions ES6 and the relationship between the standards makers and the enthusiastic JavaScript developer community.

The language will change, and as new standards are made available you'll need to know what your given platform or browser supports.
