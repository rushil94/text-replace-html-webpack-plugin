const HtmlWebPackPlugin = require("html-webpack-plugin");
var CompressionPlugin = require('compression-webpack-plugin');
const TextReplaceHtmlWebpackPlugin = require('../src/index.js');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: path.resolve(__dirname, 'index.html'),
  filename: "./index.html"
});

module.exports = {

    output: {
        path: path.resolve(__dirname, 'output'),
        filename: '[name].[chunkhash].js'
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
            regex : '/abcd/ig',
            replace : 'xyz'
        },
        {
            regex : /js/ig,
            searchString : 'def',
            replace : (match) => match + '.gz'
        },
        {
            searchString : 'def',
            replace : 'aaa'
        },
    ]
    }),
   ]
};
