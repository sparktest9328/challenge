var express = require('express');
var webpack = require('webpack');
var bodyParser = require('body-parser');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.dev.config.js');

var app = express();
var router = express.Router();
var compiler = webpack(webpackConfig);

process.noDeprecation = true;

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  stats: {
    colors: true,
    chunks: false
  }
}));

app.use(webpackHotMiddleware(compiler));

app.use('/static', express.static(__dirname + '/public'));

router.get('*', function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.sendfile(__dirname + '/src/test.html');
})

app.use(router);

app.listen(8580, function(error) {
  if (error) {
    console.error(error);
    return;
  }
  console.log('Listening at http://localhost:%s/', 8580);
});