# Terminology: Modules

-------

Learning modern modular frameworks like [Backbone.js](http://backbonejs.org/) and [AngularJS](http://angularjs.org/) involves mastering a large amount of terminology, even just to understand a Hello, World application. With that in mind, I wanted to take a break from higher-level libraries to answer the question: what is a module?

## The Background Story

Client-side development has always been rife with techniques for patching missing behaviour in browsers. Even the humble `<script>` tag has been cajoled and beaten into submission to give us alternative ways to load scripts.

It all started with concatenation. Rather than loading many scripts on a page, they are instead joined together to form a single file, and perhaps minimised. One school of thought was that this is more efficient, because a long HTTP request will ultimately perform better than many smaller requests.

That makes a lot of sense when loading libraries -- things that you want to be globally available. However, when writing your own code it somehow feels wrong to place objects and functions at the top level (the global scope).

If you're working with jQuery, you might organise your own code like this:

```javascript
$(function() {
  function MyConstructor() {
  }

  MyConstructor.prototype = {
    myMethod: function() {
    }
  };

  var instance = new MyConstructor();
});
```

That neatly tucks everything away while also only running the code when the DOM is ready. That's great for a few weeks, until the file is bustling with dozens of objects and functions. That's when it seems like this monolithic file would benefit from being split up into multiple files.

To avoid the pitfalls caused by large files, we can split them up, then load them with `<script>` tags. The scripts can be placed at the end of the document, causing them to be loaded after the majority of the document has been parsed.

At this point we're back to the original problem: we're loading perhaps dozens of `<script>` tags inefficiently. Also, scripts are unable to express dependencies between each other. If dependencies between scripts can be expressed, then they can be shared between projects and loaded on demand more intelligently.

## Loading, Optimising, and Dependencies

The `<script>` tag itself has an [async attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async). This helps indicate which scripts can be loaded asynchronously, potentially decreasing the time the browser blocks when loading resources. If we're going to use an API to somehow express dependencies between scripts and load them quickly, then it should load scripts asynchronously when possible.

Five years ago this was surprisingly complicated, mainly due to legacy browsers. Then solutions like [RequireJS](http://requirejs.org/) appeared. Not only did RequireJS allow scripts to be loaded programmatically, but it also had an optimiser that could concatenate and minimise files. The lines between loading scripts, managing dependencies, and file optmisation are inherently blurred.

## AMD

The problem with loading scripts is it's asynchronous: there's no way to say `load('/script.js')` and have code that uses `script.js` directly afterwards. The [CommonJS Modules/AsynchronousDefinition](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition), which became [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) (Asynchronous Module Definition), was designed to get around this. Rather than trying to create the illusion that scripts can be loaded synchronously, all scripts are wrapped in a function called `define`. This is a global function inserted by a suitable AMD implementation, like RequireJS.

The `define` function can be used to safely namespace code, express dependencies, and give the module a name (id) so it can be registered and loaded. Module names are "resolved" to script names using a well-defined format.

Although this means every module you write must be wrapped in a call to `define`, the authors of RequireJS realised it meant that build tools could easily interpret dependencies and generate optimised builds. So your development code can use RequireJS's client-side library to load the necessary scripts, then your production version can preload all scripts in one go, without having to change your HTML templates (`r.js` is used to do this in practice).

## CommonJS

Meanwhile, Node was becoming popular. Node's module system is characterised by using the `require` statement to return a value that contains the module:

```javascript
var User = require('models/user');
User.find(1);
```

Can you imagine if every Node module had to be wrapped in a call to `define`? It might seem like an acceptable trade-off in client-side code, but it would feel like too much boilerplate in server-side scripting when compared to languages like Python.

There have been many projects to make this work in browsers. Most use a build tool to load all of the modules referenced by `require` up front -- they're stored in memory so `require` can simply return them, creating the illusion that scripts are being loaded synchronously.

Whenever you see `require` and `exports` you're looking at [CommonJS Modules/1.1](http://wiki.commonjs.org/wiki/Modules/1.1). You'll see this referred to as "CommonJS".

Now you've seen CommonJS modules, AMD, and where they came from, how are they being used by modern frameworks?

## Modules in the Wild

[Dojo uses AMD internally](http://dojotoolkit.org/documentation/tutorials/1.7/modules/) and for creating your own modules. It didn't originally -- it used to have its own module system. Dojo adopted AMD early on.

[AngularJS](http://docs.angularjs.org/guide/module) uses its own module system that looks a lot like AMD, but with adaptations to support [dependency injection](http://docs.angularjs.org/guide/di).

RequireJS supports AMD, but it can load scripts and other resources without wrapping them in `define`. For example, a dependency between your own well-defined modules and a jQuery plugin that doesn't use AMD can be defined by using suitable configuration options when setting up RequireJS.

There's still a disparity between development and production builds. Even though RequireJS can be used to create serverless single page applications, most people still use a lightweight development server that serves raw JavaScript files, before deploying concatenated and minimised production builds.

The need for script loading and building, and tailoring for various environments (typically development, test, and production) has resulted in a new class of projects. [Yeoman](http://yeoman.io/) is a good example of this: it uses Grunt for managing builds and running a development server, Bower for defining the source of dependencies so they can be fetched, and then RequireJS for loading and managing dependencies in the browser. Yeoman generates skeleton projects that set up development and build environments so you can focus on writing code.

Hopefully now you know all about client-side modules, so the next time you hear *RequireJS*, *AMD*, or *CommonJS*, you know what people are talking about!
