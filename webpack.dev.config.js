'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var config = {
  entry: {
    index: [
      './src/Index.jsx',
      'webpack-hot-middleware/client?reload=true'
    ]
  },
  output: {
    filename: '[name].js',
    path: '/build/dist',
    publicPath: 'http://localhost:8580/'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        ]
      },
      {
        test: /\.(less)$/, 
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // { 
      //   test: /\.scss$/, 
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: "css-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib"),
      //   })
      // },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = config;
