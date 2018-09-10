# text-replace-html-webpack-plugin

[![Build Status](https://travis-ci.org/rushil94/text-replace-html-webpack-plugin.svg?branch=master)](https://travis-ci.org/rushil94/text-replace-html-webpack-plugin)

[![CircleCI](https://circleci.com/gh/rushil94/text-replace-html-webpack-plugin.svg?style=svg)](https://circleci.com/gh/rushil94/text-replace-html-webpack-plugin)

This package is intended to be used along with html-webpack-plugin. It can be used to replace text in the html file created by the html-webpack-plugin during the webpack build process. Works only wth webpack@^4

Might be used to import gzipped files (eg. bundle.js.gz) instead of .js (bundle.js) in the index.html generated by HtmlWebpackPlugin.

# Basic Usage

Add plugin to webpack config `plugins`. And pass the replacementArray.

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
var CompressionPlugin = require('compression-webpack-plugin');
const TextReplaceHtmlWebpackPlugin = require('text-replace-html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {},
    plugins: [
        htmlWebpackPlugin,
        new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/
        }),
        new TextReplaceHtmlWebpackPlugin(
            {
                replacementArray : [
                    {
                        regex : /abcd/ig,
                        replace : 'xyz'
                    },
                    {
                        // Will change <script type="text/javascript" src="main.js">
                        //to <script type="text/javascript" src="main.js.gz">
                        regex : /js/ig,
                        replace : (match) => match + '.gz'
                    },
                    {
                        searchString : 'def',
                        replace : 'aaa'
                    },
                ]
            }
        ),
    ]
};
```
