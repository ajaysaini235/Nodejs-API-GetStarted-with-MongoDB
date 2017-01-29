var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var student = require('./routes/StudentRoutes');

var app = express();

try {
  var uri = "mongodb://127.0.0.1/mongodb_demo"; 
  mongoose.connect(uri, {}, function(err, db){
    if(err) {
      console.log('Connection Error :: ', err);
    } else {
      console.log('Successfully Connected!');
    }
  });
} catch(e) {
   console.log("Caught exception trying to connect to database");
}

app.set('port', (process.env.PORT || 5000));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/student', student);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    status: false
  });
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });

module.exports = app;

