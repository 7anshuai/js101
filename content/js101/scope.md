# A Brief Lesson on Scope

------

> 原文链接：http://dailyjs.com/post/js101-scope

JavaScript is a language that demands a rigorous understanding of its scoping rules. One reason for this is JavaScript looks deceptively like other languages, but subtle differences in the rules that govern identifier visibility make it unexpectedly difficult to master.

Here's some computer science so you can impress your friends and wayward wizards: *scope* refers to the visibility of a given identifier within a program. Sometimes we talk about *function scope* and *block scope*. I've already covered function scope in this series, but JavaScript doesn't have *block scope*. In this context, [block](http://es5.github.io/#x12.1) refers to control structures like `if` statements and `for` loops -- a block of statements grouped by curly braces.

## Declaring Variables and Functions
Variables can be defined with the `var` statement, and are initialised to `undefined`:

```javascript
var a; // undefined
var b = 'hello';
```

The scoping of these statements is dependent on where they're declared. If `var` statements don't appear inside a function, they're globally accessible:

```javascript
var a = 1;

function sum(b) {
  return a + b;
}
```

## Missing `var`

Problems start to occur when a `var` statement is forgotten:

```javascript
function example() {
  a = 1;
  b = 1;
  return a + b;
}
```

These variables are not local to the `example` function, they're actually global. If `a` or `b` already existed, then their values will be overwritten.

Accidentally leaving out a `var` statement is surprisingly easy, and could potentially cause irritating bugs. Tools like [JSLint](http://www.jslint.com/) will attempt to use *static analysis* to find such errors.

## Variable Declaration Styles

Some people like to group `var` statements together:

```javascript
var a = 1,
    b = 2,
    c = 3;
```

What would happen if a comma was missed by mistake?

```javascript
function example() {
  var a = 1
      b = 2,
      c = 3;
}

example();

console.log(typeof a);
console.log(typeof b);
console.log(typeof c);
```

Running this will show that while `a` is `undefined` and therefore local to `example`, the other variables are global.

The reason some developers place commas before lists of variable declarations is to make it easier to see if a comma has been forgotten:

```javascript
var a = 1
  , b = 2
  , c = 3
  ;
```

However, the [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml) recommends using a `var` statement on every line, to avoid the problem altogether.

## No Block Scope

Variables and functions are visible within the current function, regardless of blocks. This is amazingly confusing because it prevents us from using control structures to declare functions and variables in a dynamic way.

Defining variables in blocks may confuse programmers who work with other languages:

```javascript
function example() {
  // Do not do this
  for (var i = 0; i < 3; i++) {
    var a = 1;
    // Do stuff with `a`
  }
}
```

Since there is no block scope, the previous example should be written like this:

```javascript
function example() {
  var i, a;
  for (i = 0; i < 3; i++) {
    a = 1;
    // Do stuff with `a`
  }
}
```

## Hoisting

Have you ever noticed how some things appear to be in scope even though their definition appears later in the file? The colloquial term for this is *hoisting*:

```javascript
function example() {
  console.log(a);
  var a = 1;
}

example();
```

Running this will log `undefined` rather than `1`. The term *hoisting* isn't in the ECMAScript 3 or 5 standards, but the behaviour is documented in [10.5 Declaration Binding Instantiation](http://es5.github.io/#x10.5), in the line that starts *For each _VariableDeclaration* and *VariableDeclarationNoIn d* in code, in source text order do_. The reason the value is `undefined` rather than `1` is also explained by the specification:

> A variable with an Initialiser is assigned the value of its AssignmentExpression when the VariableStatement is executed, not when the variable is created.

## Confusing Closures

The following example defines three functions and assigns them as methods to an object. Each method is then called after the loop has finished.

```javascript
function example() {
  var o = {}, i = 0;
  for (i = 0; i < 3; i++) {
    o[i] = function() { console.log(i); };
  }
  o[0]();
  o[1]();
  o[2]();
}

example();
```
The output will be `3` each time, because the closure is bound to the function scope, not the (non-existent) block scope. Intermediate JavaScript programmers often make this mistake.

## Conclusion

If understanding JavaScript's scoping rules was a video game, then the levels would be as follows:

- Title Screen: Press [Start] to begin (I always press the other buttons to see if it starts anyway)
- Level 1: Function scope
- Level 2: No block scope
- Level 3: Missing var
- Level 4: Hoisting
- Level 5: Closures

The scoping story isn't complete, and worth noting is the fact that [ECMAScript extensions](http://kangax.github.com/es5-compat-table/non-standard/) can subtly alter scoping behaviour for certain things. If you're interested in going beyond this 101 introduction level article, then try reading Angus Croll's [Function Declarations vs. Function Expressions](http://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/) to see how some of these scoping rules play out, and Dmitry Soshnikov's [post on ECMAScript's lexical environments](http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/#this-binding).

## References

- [Code Conventions for the JavaScript Programming Language](http://javascript.crockford.com/code.html) by Douglas Crockford
- ECMAScript 5: [10.5 Declaration Binding Instantiation](http://es5.github.io/#x10.5)
- [JSLint](http://www.jslint.com/)
