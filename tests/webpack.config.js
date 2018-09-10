const HtmlWebPackPlugin = require("html-webpack-plugin");
var CompressionPlugin = require('compression-webpack-plugin');
const TextReplaceHtmlWebpackPlugin = require('../src/index.js');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: path.resolve(__dirname, 'index.html'),
  filename: "index.html"
});

module.exports = {

    mode : 'production',

    output: {
        path: path.resolve(__dirname, 'output'),
        filename: '[name].js'
    },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/
        }
    ),
    new TextReplaceHtmlWebpackPlugin({ replacementArray : [
        {
            regex : /abcd/ig,
            replace : 'xyz'
        },
        {
            //Will give warning, not error. (As error would have stopped the webpack build)
            regex : /js/ig,
            searchString : 'def',
            replace : (match) => match + '.gz'
        },
        {
            searchString : 'def',
            replace : 'aaa'
        },
        {
            //Will give warning, not error. (As error would have stopped the webpack build)
            searchString : '/index/ig',
            replace : 'newIndex'
        }
    ]
    }),
   ]
};
