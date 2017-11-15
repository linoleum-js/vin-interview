var webpack = require('webpack');
var path = require('path');
var combineLoaders = require('webpack-combine-loaders');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'script.js'
  },

  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".json"]
  },

  module: {
    loaders: [{
      test: /\.js/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: combineLoaders([{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }])
    }, {
      test: /\.html$/,
      loader: 'text-loader'
    }]
  },

  devtool: 'cheap-module-eval-source-map'
};
