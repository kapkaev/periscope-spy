var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var broadcasts = require('./routes/broadcasts');

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/broadcasts', broadcasts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


function startSpy(){

  var Spy = require('./libs/spy');
  var config = require('config');

  var jon = 3258340503,
      spy = new Spy(config.get('twitter'), jon);

  global.eventDB = spy.eventDB;
  global.broadcastDB = spy.broadcastDB;

  if (process.argv.indexOf('with_spy') != -1){
    console.log("Starting with SPY mode")
    spy.start();
  }
}

startSpy();


app.locals.eventType = function(type){
  switch (type) {
    case 1:
      return 'comment'
      break;
    case 2:
      return 'heart'
      break;
    case 3:
      return 'join'
      break;
    default:
      return ''
  }
}

module.exports = app
