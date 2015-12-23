var path = require('path');
var express = require('express');
var webpack = require('webpack');
var request = require('request');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

/* front end express dev server is used for hot reloading, redirects all requests to backend server */
app.get('*', function(req, res) {
  var newUrl = 'http://localhost:8080' + req.path
  console.log('Redirecting to '+ newUrl);
  req.pipe(request(newUrl)).pipe(res);
});


app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});