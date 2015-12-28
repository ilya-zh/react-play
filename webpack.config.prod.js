var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, './src/main/resources/static/jsx/some.jsx')
  ],
  output: {
    path: path.join(__dirname, 'build/resources/main/static/assets/js'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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
      loader: 'style!css!sass'
    }]
  }
};