/* eslint strict: 0 */
const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.template.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'src/assets' },
      { from: 'src/lib', to: 'src/lib' }
    ])
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss']
    },
    {
      test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg(\?v\=.*)?$|\.woff(\?v\=.*)?$|\.ttf(\?v\=.*)?$|\.eot(\?v\=.*)?$|\.woff?2(\?v\=.*)?/, // eslint-disable-line max-len
      loader: 'file-loader?name=[path][name].[ext]'
    }]
  },
  postcss() {
    return [precss, autoprefixer];
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
};
