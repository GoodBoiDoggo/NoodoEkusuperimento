
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
//[SH] Bring in the data model
require('./models/db');
console.log('models loaded');
// [SH] Bring in the Passport config after model is defined
require('./config/passport');
console.log('passport config loaded');
//[SH] Initialise Passport before using the route middleware
app.use(passport.initialize());


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app_client/views');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(express.static(path.join(__dirname, 'app_client','app')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/boi', express.static(path.join(__dirname,'app_client','controllers')));
app.use('/pic', express.static(path.join(__dirname,'app_client','images')));
app.use('/service',express.static(path.join(__dirname,'app_client','services')));

require('./routes')(app);
console.log('routes loaded');
//sdsdsfsdfsd
// development only
if ('development' == app.get('env')) {
}
//error handlers
//catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//[SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
if (err.name === 'UnauthorizedError') {
 res.status(401);
 res.json({"message" : err.name + ": " + err.message});
}
});
//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
 app.use(function(err, req, res, next) {
     res.status(err.status || 500);
     res.render('error', {
         message: err.message,
         error: err
     });
 });
}

//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 res.render('error', {
     message: err.message,
     error: {}
 });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
