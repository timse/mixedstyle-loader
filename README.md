# Mixed Style loader

The loader that should not even exist. But who doesn't like to nurse a bunch of legacy code.

## what it does

It consumes css files with css `@import` statements and other css code.
The magic is that those `@import` statements can go to any kind of `css` or `css`-precompiler file, as long as there is a proper loader existing and configured for it.

## example

imagine you have 3 files `a.css`, `b.sass`, and `c.scss`
and you need to load them in the order:

    * `c.scss`
    * `b.sass`
    * `a.css`

so you create a file `d.css` which looks as follows:
```
    @import 'c.scss';
    @import 'b.sass';
    @import 'a.css';
```
then you will probably run into a couple of issues:
 - `css-loader` will fail trying to interpret `sass` and `scss`
 - `sass-loader` will hoist all `*.css` imports assuming you are too stupid to know where they belong
 - …and so on

### `mixedstyle` to the rescue!

assuming you still have your `d.css` file just add this to your loader:

```js
    loaders: [
        {
            test: /\W?d\.css$/,
            loader: "mixedstyle"
        }
    ]
```

or probably you want to use it for the Extract-Text-Plugin, in that case do:

```js
    loaders: [
        {
            test: /\W?d\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "mixedstyle")
        }
    ]
```

or simply go for inline

```js
    var x = require('mixedstyle!./d.css');

    //or
    var x = require('style!mixedstyle!./d.css');
```

