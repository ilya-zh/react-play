var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './src/main/resources/static/jsx/App.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build/resources/main/static/assets/js'),
    filename: 'bundle.js',
    publicPath: '/assets/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src'),
      exclude: '/node_modules/'
    },
    // SASS
    {
      test: /\.scss$/,
      loader: 'style!css!sass',
    },
    {
      test: /\.css$/,
      loader: 'style!css!sass',
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }]
  }
};