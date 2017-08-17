'use strict'; //eslint-disable-line

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package').name;

const DEV = process.env.NODE_ENV === 'development';

const entry = DEV ?
  ['webpack-hot-middleware/client', './docs/index.jsx'] :
  './src/index.js';

const plugins = DEV ? [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './docs/index.html',
  }),
] : [];

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: pkg.name,
    libraryTarget: 'umd',
  },
  externals: DEV ? [] : ['react', 'react-dom'],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins,
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'docs'),
          path.join(__dirname, 'src')],
      },
    ],
  },
};
