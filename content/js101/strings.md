# A Primer on Strings and String Encodings

------

> 原文链接：http://dailyjs.com/post/js101-strings

What is a JavaScript string? It depends on the context. For instance, a string is a primitive value -- a value represented at the "lowest level" of the language's implementation.

Strings are also members of the type `String`. Strings can be created with the `String` constructor. Running `new String('hello')` creates an instance of String.

Finally, String literals are found in the program's source: `var name = 'alex'`.

Given that there are many ways to represent strings, what is the underlying encoding in JavaScript? Both the third and fifth editions of ECMAScript state that strings are represented as [16-bit unsigned integers](http://es5.github.io/#x4.3.16):

> Each integer value in the sequence usually represents a single 16-bit unit of UTF-16 text. However, ECMAScript does not place any restrictions or requirements on the values except that they must be 16-bit unsigned integers.

## String Encoding

Ultimately a string is just a sequence of characters. In other words, an array of units of information that correspond to digits, letters, and so on. Characters are represented as byte sequences.

When working on client-side JavaScript and HTML, we're used to seeing `charset=UTF-8`. UTF-8 is a system for encoding characters, and is actually "variable width", which means the bytes used to represent an individual character can vary in length.

I said earlier that JavaScript strings are 16-bit, so how does this relate to UTF-8? In extremely simplified terms for the purposes of a beginner's article, you can think about it like this: JavaScript engines use a fixed 16-bit representation of characters that makes it easier to manage strings internally.

So, even though a browser's JavaScript engine internally represents characters as 16-bit numbers, we don't usually need to know about this. Writing the strings to form controls with the DOM or using `XMLHTTPRequest` should convert the string to the right encoding. Ideally the server should have sent the `Content-Type` header set to UTF-8, so the browser will know what to do.

## More About Encodings

Even if you're a client-side developer that doesn't care about string encodings, Joel Spolsky's [The Absolute Minimum Every Software Developer Absolutely, Positively Must Know About Unicode and Character Sets](http://www.joelonsoftware.com/articles/Unicode.html) is worth reading because it explains the history behind string encodings. Understanding the history behind what can be a frustrating topic makes it easier to understand.

If you need to work on string encodings in JavaScript, Johan Sundström's post [Encoding / decoding UTF8](http://ecmanaut.blogspot.co.uk/2006/07/encoding-decoding-utf8-in-javascript.html) in javascript from back in 2006 explains how to encode and decode UTF-8.

Monsur Hossain went on to write [UTF-8 in JavaScript](http://monsur.hossa.in/2012/07/20/utf-8-in-javascript.html) which goes into `unescape` and `encodeURIComponent` in more detail.
